import db from '../../lib/database.js'
import { delay } from '../../lib/func.js'

export async function before(m, { isBotAdmin, isOwner }) {
	if (m.isBaileys || m.text.length < 45000 || isOwner) return !1
	if (m.isGroup) {
		if (!db.data.chats[m.chat].antivirus || !isBotAdmin) return !1
		await this.reply(m.chat, `@${m.sender.split('@')[0]} *dianggap* mengirim virtext !\n(${m.text.length} karakter teks)`, fkontak, { mentions: [m.sender] })
		await this.sendMsg(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender } })
		await delay(1000)
		await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
	}
	await this.updateBlockStatus(m.sender, 'block')
	return !0
}