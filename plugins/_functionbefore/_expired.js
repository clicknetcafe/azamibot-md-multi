import db from '../../lib/database.js'
import { delay } from '../../lib/func.js'

export async function before(m) {
	if (!m.isGroup) return !1
	let chat = db.data.chats[m.chat]
	if (chat.expired == 0) return !1
	if (+new Date() > chat.expired) {
		await this.reply(m.chat, 'Durasi join bot telah habis.\nBye🖐 bot akan left!!')
		chat.expired = 0
		chat.joindate = 0
		chat.joincd = 0
		await delay(3000)
		await this.groupLeave(m.chat).catch(_ => console.log(_.message))
	}
	return !0
}