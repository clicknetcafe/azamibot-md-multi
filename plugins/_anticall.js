import db from '../lib/database.js'

export async function before(m, { isAdmin, text, isBotAdmin }) {
	this.ev.on('call', async (call) => {
		if (call[0].status == 'offer' && db.data.datas.anticall) await this.rejectCall(call[0].id, call[0].from)
	})
	return !0
}