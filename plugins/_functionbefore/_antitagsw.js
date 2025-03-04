import db from '../../lib/database.js'

export async function before(m, { isAdmin, text, isBotAdmin }) {
	if (m.fromMe) return !1
	if (m.isGroup || m.chat == 'status@broadcast') {
		this.cektag = this.cektag ? this.cektag : {}
		if (m.isGroup) {
			if (!m.message || !db.data.chats[m.chat]?.antitagsw) return !1
			if (Object.keys(m.message).length === 0) {
				if (this.cektag.user != m.key.participant) return !1
				const { time } = this.cektag
				if ([time, time+1, time+2].includes(m.messageTimestamp?.low)) {
					if (isBotAdmin)
						await this.sendMsg(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender } })
				} else this.cektag = {}
			}
		} else this.cektag = { user: m.key.participant, time: m.messageTimestamp?.low }
	}
	return !0
}