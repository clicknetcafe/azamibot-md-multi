import db from '../lib/database.js'
import { downloadContentFromMessage } from '@adiwajshing/baileys'

export async function before(m) {
	if (!m.isGroup) return !1
	if (db.data.chats[m.chat].viewonce && m.message?.[m.mtype]?.viewOnce) {
		let buffer = await m.download()
		let i = `[ ANTIVIEWONCE AKTIF ]\n\n👾 *Sender* : @${m.sender.split`@`[0]}${m.text ? `\n\n*Caption :*\n${m.text}` : ''}`
		let j = m.text ? [m.sender, ...[...m.text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')] : [m.sender]
		await this.sendFile(m.chat, buffer, '', i, null, false, { mentions: j, quoted: fkontak })
	}
	return !0
}