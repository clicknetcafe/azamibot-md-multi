import { areJidsSameUser } from '@adiwajshing/baileys'

let handler = async (m, { conn, text, args, participants }) => {
	if (m.quoted) {
		if (m.quoted.sender === conn.user.jid) return m.reply(`jangan saya min *-_-*`)
		let user = m.quoted.sender;
		try {
			await delay(1000)
			await conn.groupParticipantsUpdate(m.chat, [user], 'promote')
			m.reply(`Sukses, @${(user || '').replace(/@s\.whatsapp\.net/g, '')} sekarang Admin.`, null, { mentions: [user] })
		} catch (e) {
			console.log(e)
			let user = m.quoted.sender;
			await m.reply(`*!* Gagal promote @${(user || '').replace(/@s\.whatsapp\.net/g, '')}`, null, { mentions: [user] })
		}
	} else {
		if (!text) return m.reply(`*@tag* yang ingin di promote!`)
		try {
			let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
			let users2 = [`${users[0]}`]
			for (let user of users2) {
				if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
					await delay(1000)
					const res = await conn.groupParticipantsUpdate(m.chat, [user], 'promote')
					await m.reply(`Sukses, @${(user || '').replace(/@s\.whatsapp\.net/g, '')} sekarang Admin.`, null, { mentions: [user] })
				}
			}
		} catch (e) {
			console.log(e)
			let user = m.mentionedJid[0]
			m.reply(`*!* Gagal promote @${(user || '').replace(/@s\.whatsapp\.net/g, '')}`, null, { mentions: [user] })
		}
	}
}

handler.menugroup = ['promote @tag']
handler.tagsgroup = ['group']
handler.command = /^(promote)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))