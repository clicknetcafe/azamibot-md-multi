import db from '../lib/database.js'
import util, { format } from 'util'

export async function before(m) {
	if (!m.isGroup) return !1
	if (!m.message) return !0
	if (db.data.chats[m.chat].viewonce && m.message.viewOnceMessageV2) await this.sendMessage(m.chat, { text: format(util.inspect(m.message.viewOnceMessageV2, { depth: null })) }, { quoted: fkontak })
	return !0
}