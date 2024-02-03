import db from '../../lib/database.js'
import { delay, ranNumb } from '../../lib/func.js'
import { getBinaryNodeChild, getBinaryNodeChildren } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, participants }) => {
	if (db.data.settings[conn.user.jid].restrict) throw `[ RESTRICT ENABLED ]`
	let who, not = [], users = []
	if (text.includes(',')) who = text.split(',').map(v => v.replace(/\D/g, '') + '@s.whatsapp.net')
	else who = text ? [(text.replace(/\D/g, '') + '@s.whatsapp.net')] : m.quoted ? [m.quoted.sender] : m.mentionedJid ?? []
	if (who.length == 0) throw `Yang mau di add siapa ? Jin ya ?`
	who = [...new Set(who.map(v => v.startsWith('08') ? v.replace('08','628') : v))]
	for (let x of who) {
		let test = await conn.onWhatsApp(x)
		if (test.length > 0) users.push(test[0].jid)
		else not.push(x.split('@')[0])
	}
	if (users.length == 0) throw `@${not.join(', @')} bukan pengguna WhatsApp`
	if (not.length > 0) m.reply(`@${not.join(', @')} bukan pengguna WhatsApp`)
	let img = await conn.profilePictureUrl(m.chat, 'image').catch(_ => 'https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/avatar_contact.jpg')
	for (let i of users) {
		let res = await conn.groupParticipantsUpdate(m.chat, [i], 'add')
		for (let x of res) {
			if (x.status == '403') {
				let gc = await conn.getName(m.chat)
				let node = getBinaryNodeChildren(x.content, 'add_request')
				await conn.reply(m.chat, `Couldn't add @${x.jid.split('@')[0]}, send invitation...`, m, { mentions: [x.jid] })
				await conn.sendGroupV4Invite(x.jid, m.chat, node[0]?.attrs?.code || node.attrs.code, node[0]?.attrs?.expiration || node.attrs.expiration, gc, img, `Invitation to join ${gc} Group${packname ? `\n_*―* by ${packname}_` : ''}`)
			} else if (x.status == '408') {
				await conn.reply(m.chat, `You couldn't add @${x.jid.split('@')[0]} because they left the group recently. Try again later.`, m, { mentions: [x.jid] })
			} else if (x.status == '409') {
				await conn.reply(m.chat, `@${x.jid.split('@')[0]} already in this group.`, m, { mentions: [x.jid] })
			} else {
				if (x.status == '200') console.log(x)
				else m.reply(JSON.stringify(x, null, 2))
			}
		}
		await delay(ranNumb(2000, 5500))
	}
}

handler.menugroup = ['add']
handler.tagsgroup = ['group']
handler.command = /^(o?add)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler