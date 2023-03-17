import db from '../lib/database.js'
import { delay } from '../lib/others.js'

export async function before(m, { isBotAdmin }) {
	if (m.text.length < 45000) return !0
	if (m.isGroup) {
		if (!db.data.chats[m.chat].antivirus || !isBotAdmin) return !0
		await this.reply(m.chat, `@${m.sender.split('@')[0]} *terdeteksi* mengirim Virus !`, fkontak, { mentions: [m.sender] })
		await this.sendMsg(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender } })
		await delay(500)
		await this.groupParticipantsUpdate(m.chat, [m.sender], "remove")
	}
	await this.updateBlockStatus(m.sender, 'block')
	return !0
}