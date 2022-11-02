import db from '../lib/database.js'

export async function before(m, { conn, isAdmin, isBotAdmin }) {
	if (m.isBaileys && m.fromMe) return !0
	let user = db.data.users[m.sender]
	if (!user.banned) return !0
	if (new Date - user.lastbanned <= user.bannedcd) return !0
	user.lastbanned = 0
	user.bannedcd = 0
	user.banned = false
	await this.sendMessage(m.chat, { text: `@${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')} udh gk di ban slur, jan spam lagi yak!`, mentions: [m.sender] }, { quoted: fkontak })
	return !0
}