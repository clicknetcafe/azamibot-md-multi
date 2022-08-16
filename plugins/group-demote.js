import { areJidsSameUser } from '@adiwajshing/baileys'

let handler = async (m, { conn, text, args, isOwner, participants }) => {
	if (m.quoted) {
		if (m.quoted.sender === conn.user.jid) return m.reply(`jangan saya min *-_-*`)
		let user = m.quoted.sender;
		try {
			await delay(1000)
			await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
			m.reply(`@${(user || '').replace(/@s\.whatsapp\.net/g, '')} sekarang bukan Admin.`, null, { mentions: [user] })
		} catch (e) {
			console.log(e)
			let user = m.quoted.sender;
			await m.reply(`*!* Gagal demote @${(user || '').replace(/@s\.whatsapp\.net/g, '')}`, null, { mentions: [user] })
		}
	} else {
		if (!text) return m.reply(`*@tag* yang ingin di demote!`)
		try {
			let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
			let users2 = [`${users[0]}`]
			for (let user of users2) {
				if (user.endsWith('@s.whatsapp.net') && (participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
					await delay(1000)
					const res = await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
					await m.reply(`@${(user || '').replace(/@s\.whatsapp\.net/g, '')} sekarang bukan Admin.`, null, { mentions: [user] })
				}
			}
		} catch (e) {
			console.log(e)
			let user = m.mentionedJid[0]
			m.reply(`*!* Gagal demote @${(user || '').replace(/@s\.whatsapp\.net/g, '')}`, null, { mentions: [user] })
		}
	}
}

handler.menugroup = ['demote @tag']
handler.tagsgroup = ['group']
handler.command = /^(demote)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))