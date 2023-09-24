import db from '../../lib/database.js'

export async function before(m, { isAdmin, isBotAdmin }) {
	if (m.isGroup) {
		let chat = db.data.chats[m.chat]
		if (chat.permaBan || chat.mutecd == 0) return !1
		if (new Date - chat.lastmute <= chat.mutecd) return !1
		chat.lastmute = 0
		chat.mutecd = 0
		chat.isBanned = false
		await this.reply(m.chat, `Bot dapat digunakan kembali.`, fkontak)
	}
	return !0
}