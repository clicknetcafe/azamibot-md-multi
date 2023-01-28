import db from '../lib/database.js'
import { downloadContentFromMessage } from '@adiwajshing/baileys'

export async function before(m) {
	if (!m.isGroup) return !1
	if (m.mtype != 'viewOnceMessageV2') return !0
	if (db.data.chats[m.chat].viewonce) {
		let msg = m.message.viewOnceMessageV2.message
		let type = Object.keys(msg)[0]
		let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
		let buffer = Buffer.from([])
		for await (const chunk of media) {
			buffer = Buffer.concat([buffer, chunk])
		}
		let i = `[ ANTIVIEWONCE AKTIF ]\n\n👾 *Sender* : @${m.sender.split`@`[0]}${msg[type].caption ? `\n\n*Caption :*\n${msg[type].caption}` : ''}`
		let j = msg[type].caption ? [m.sender, ...[...msg[type].caption.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')] : [m.sender]
		await this.sendFile(m.chat, buffer, '', i, null, false, { mentions: j, quoted: fkontak })
	}
	return !0
}