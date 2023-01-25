import db from '../lib/database.js'

export async function before(m, { isAdmin, isBotAdmin }) {
	if (m.isGroup) {
		let chat = db.data.chats[m.chat]
		if (chat.permaBan) return !0
		if (chat.mutecd == 0) return !0
		if (new Date - chat.lastmute <= chat.mutecd) return !0
		chat.lastmute = 0
		chat.mutecd = 0
		chat.isBanned = false
		await this.sendMessage(m.chat, { text: `Bot dapat digunakan kembali.` }, { quoted: fkontak })
	}
	return !0
}