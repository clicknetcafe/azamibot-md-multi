import db from '../../lib/database.js'

const linkRegex = /(chat\.)?whatsapp\.com\/(?:invite\/)?(?:channel\/)?([0-9A-Za-z]{20,27})/i
const linkLain  = /(chat\.)?whatsapp\.com\/(?:invite\/)?(?:channel\/)?([0-9A-Za-z]{20,27})/g

let handler = async (m, { conn, isAdmin, isBotAdmin, text }) => {
	let user = db.data.users[m.sender]
	let chat = db.data.chats[m.chat]
	const isGroupLink = linkRegex.exec(text)
	if (m.isGroup && chat.antiLink && isGroupLink && !isAdmin) {
		if (isBotAdmin) {
			const p = await conn.groupInviteCode(m.chat)
			const linkThisGroup = `chat.whatsapp.com/${p}`
			const ttext = [...text.matchAll(linkLain)].map(v => v[0]).filter(v => !v.includes(p))
			if (ttext.length > 0) text = text.replace(/(chat\.)?whatsapp\.com\/(?:invite|channel\/)?([0-9A-Za-z]{20,27})/g, linkThisGroup)
		}
	}
	user.afk = + new Date
	user.afkReason = text
	if (user.afkReason) {
		let tes = await conn.parseMention(user.afkReason)
		for (let x of tes) user.afkReason = user.afkReason.replace('@'+x.split('@')[0], await conn.getName(x))
	}
	m.reply(`${await conn.getName(m.sender)} is now AFK${text ? `\n  *Alasan* : ${user.afkReason}` : ''}`)
}

handler.menugroup = ['afk']
handler.tagsgroup = ['group']
handler.command = /^(afk)$/i

export default handler