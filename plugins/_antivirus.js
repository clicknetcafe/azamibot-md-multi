import db from '../lib/database.js'

export async function before(m, { conn, isAdmin, isBotAdmin }) {
	if (m.isBaileys && m.fromMe) return !0
	if (m.isGroup) {
		let chat = db.data.chats[m.chat]
		if (m.text.length > 50000 && chat.antivirus && isBotAdmin) {
			await this.sendMessage(m.chat, { text: `@${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')} *terdeteksi* mengirim Virus !`, mentions: [m.sender] }, { quoted: fkontak })
			await this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender } })
			await this.groupParticipantsUpdate(m.chat, [m.sender], "remove")
			await this.updateBlockStatus(m.sender, 'block')
		}
	} else {
		if (m.text.length > 50000) {
			await this.sendMessage(m.chat, { text: `@${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')} *terdeteksi* mengirim Virus !`, mentions: [m.sender] }, { quoted: fkontak })
			await this.updateBlockStatus(m.sender, 'block')
		}
	}
	return !0
}