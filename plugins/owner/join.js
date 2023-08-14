import db from '../../lib/database.js'
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i
const cooldown = 86400000

let handler = async (m, { conn, text, isOwner }) => {
	if (db.data.settings[conn.user.jid].restrict) throw `[ RESTRICT ENABLED ]`
	let [_, code, expired] = text.match(linkRegex) || []
	if (!code) throw 'Link invalid'
	try {
		let res = await conn.groupAcceptInvite(code)
		expired = Math.floor(Math.min(999, Math.max(1, isOwner ? isNumber(expired) ? parseInt(expired) : 0 : 3)))
		m.reply(`Berhasil join grup ${res}${expired ? ` selama ${expired} hari` : ''}`)
		let chats = db.data.chats[res]
		if (!chats) chats = db.data.chats[res] = {}
		if (expired) {
			chats.expired = +new Date() + expired * cooldown
			chats.joindate = new Date * 1
			chats.joincd = expired * cooldown
		}
	} catch (e) {
		console.log(e)
		m.reply(`Link expired / bot sudah di kick sebelumnya.`)
	}
}

handler.menuowner = ['join <chat.whatsapp.com>']
handler.tagsowner = ['owner']
handler.command = /^(join)$/i

handler.owner = true

export default handler

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))