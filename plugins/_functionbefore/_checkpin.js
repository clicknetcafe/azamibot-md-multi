import db from '../../lib/database.js'

export async function before(m, { isAdmin, text, isBotAdmin }) {
	if (!m.isGroup) return !1
	let msg = m?.message?.pinInChatMessage
	if (msg) {
		let pin = db.data.chats[m.chat]?.pinmsg?.pinnedchat
		if (!pin) return !1
		if (!pin[msg.key.id]) pin[msg.key.id] = msg.key
		if (pin[msg.key.id] && msg.type == 2) delete pin[msg.key.id]
	}
	return !0
}