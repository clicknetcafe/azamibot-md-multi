import db from '../../lib/database.js'

export async function before(m, { isAdmin, text, isBotAdmin }) {
	if (!/@(broadcast|g\.us)/.test(m.key?.remoteJid || '')) return !1
	this.cektag = this.cektag ? this.cektag : {}
	if (m.isGroup) {
		if (!db.data.chats[m.chat]?.antitagsw) return !1
		if (m.message?.protocolMessage) {
			let sw = m.message.protocolMessage
			if (sw?.type == 25 || sw?.type == 0) {
				await this.sendMsg(m.chat, { delete: { remoteJid: m.key.remoteJid, fromMe: false, id: m.key.id, participant: m.sender } })
			}
		} else {
			if (Object.keys(m.message || {}).length !== 0) return !1
			if (this.cektag.user != m.key.participant) return !1
			if (m.messageTimestamp.low >= this.cektag.time && m.messageTimestamp.low <= this.cektag.time+6) {
				if (isBotAdmin)
					await this
				.sendMsg(m.chat, { delete: { remoteJid: m.key.remoteJid, fromMe: false, id: m.key.id, participant: m.sender } })
			}
		}
	} else this.cektag = { user: m.key.participant, time: m.messageTimestamp.low }
	return !0
}