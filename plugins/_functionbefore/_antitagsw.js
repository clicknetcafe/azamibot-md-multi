import db from '../../lib/database.js'

export async function before(m, { isAdmin, text, isBotAdmin }) {
	if (m.fromMe) return !1
	if (m.isGroup || m.chat == 'status@broadcast') {
		this.cektag = this.cektag ? this.cektag : {}
		if (m.isGroup) {
			if (!db.data.chats[m.chat]?.antitagsw) return !1
			if (Object.keys(m.message || {}).length === 0) {
				if (this.cektag.user == m.key.participant) {
					let { time } = this.cektag
					if (m.messageTimestamp?.low >= time && m.messageTimestamp?.low <= time + 3) {
						if (isBotAdmin)
							await this
						.sendMsg(m.chat, { delete: { remoteJid: m.key.remoteJid, fromMe: false, id: m.key.id, participant: m.sender } })
					} else delete this.cektag.user
				}
			}
		} else this.cektag = { user: m.key.participant, time: m.messageTimestamp?.low }
	}
	return !0
}