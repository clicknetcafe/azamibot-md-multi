import { areJidsSameUser } from '@adiwajshing/baileys'

let handler = async (m, { conn, text, args, participants }) => {
	if (m.quoted) {
		if (m.quoted.sender === conn.user.jid) throw `yahaha`
		let usr = m.quoted.sender;
		await conn.groupParticipantsUpdate(m.chat, [usr], "remove")
	} else {
		let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[0] ? (args[0].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
		if (!who) return m.reply('Tag target yang ingin di kick!!')
		let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
		let kickedUser = []
		for (let user of users)
			if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
				const res = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
				kickedUser.concat(res)
				await delay(1 * 1000)
			}
		m.reply(`Succes kick ${kickedUser.map(v => '@' + v.split('@')[0])}`, null, { mentions: kickedUser })
	}
}

handler.menugroup = ['kick']
handler.tagsgroup = ['owner']
handler.command = /^(kick|tendang)$/i

handler.owner = true
handler.botAdmin = true
handler.group = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))