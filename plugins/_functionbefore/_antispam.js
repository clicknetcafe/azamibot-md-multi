import db from '../../lib/database.js'

export async function all(m) {
	if (!m.message) return
	this.spam = this.spam ? this.spam : {}
	if (!db.data.users[m.sender]) return !1
	if (m.sender in this.spam) {
		this.spam[m.sender].count++
		if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam > 10) {
			if (db.data.users[m.sender].banned) return
			//if (this.spam[m.sender].count > 10) m.reply('*Jangan Spam!!*')
			if (this.spam[m.sender].count > 10) {}
			this.spam[m.sender].count = 0
			this.spam[m.sender].lastspam = m.messageTimestamp.toNumber()
		}
	}
	else this.spam[m.sender] = { jid: m.sender, count: 0, lastspam: 0 }
}