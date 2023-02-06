import db from '../lib/database.js'

export async function before(m, { isAdmin, isBotAdmin }) {
	let user = db.data.users[m.sender]
	if (user.permaban) return !0
	if (user.bannedcd == 0) return !0
	if (new Date - user.lastbanned <= user.bannedcd) return !0
	user.lastbanned = 0
	user.bannedcd = 0
	user.banned = false
	await this.reply(m.chat, `@${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')} udh gk di ban slur, jan spam lagi yak!`, fkontak, { mentions: [m.sender] })
	return !0
}