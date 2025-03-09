import db from '../../lib/database.js'
const { proto } = await (await import('@whiskeysockets/baileys')).default

export async function before(m, { isAdmin, isBotAdmin }) {
	if (m.isGroup) {
		let chat = db.data.chats[m.chat]
		if (chat.permaBan || chat.mutecd == 0) return !1
		if (new Date - chat.lastmute <= chat.mutecd) return !1
		chat.lastmute = 0
		chat.mutecd = 0
		chat.isBanned = false
		await this.reply(m.chat, `Bot dapat digunakan kembali.`, fkontak)
		let pin = db.data.chats[m.chat].pinmsg
		if (pin['mutegc']) {
			await this.sendMsg(m.chat, { pin: pin['mutegc'], type: proto.PinInChat.Type['UNPIN_FOR_ALL'] })
			delete pin['mutegc']
		}
	}
	return !0
}