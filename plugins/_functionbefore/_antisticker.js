import db from '../../lib/database.js'

export async function before(m, { isAdmin, isBotAdmin }) {
	if (m.fromMe || !m.isGroup) return !1
	let chat = db.data.chats[m.chat]
	if (chat.antiSticker && m.mtype == "stickerMessage" && !isAdmin && isBotAdmin)
		await this.sendMsg(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender } })
	return !0
}