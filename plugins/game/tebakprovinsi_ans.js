import db from '../../lib/database.js'
import similarity from 'similarity'
const threshold = 0.72

export async function before(m) {
	let user = db.data.users[m.sender]
	if (!user || user.banned) return !1
	let id = m.chat
	if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text)
		return !0
	this.tebakprovinsi = this.tebakprovinsi ? this.tebakprovinsi : {}
	if (!(id in this.tebakprovinsi))
		return
	if (m.quoted.id == this.tebakprovinsi[id][0].id) {
		let json = JSON.parse(JSON.stringify(this.tebakprovinsi[id][1]))
		if (m.text.toLowerCase() == json.result.title.toLowerCase().trim()) {
			user.exp += this.tebakprovinsi[id][2]
			user.spamcount += 2
			this.reply(m.chat, `*Benar!* 🎉\n\n+${this.tebakprovinsi[id][2]} Exp`, m)
			clearTimeout(this.tebakprovinsi[id][3])
			delete this.tebakprovinsi[id]
		} else if (similarity(m.text.toLowerCase(), json.result.title.toLowerCase().trim()) >= threshold)
			m.reply(`*Dikit Lagi!*`)
		else
			m.reply(`*Salah!*`)
	}
	return !0
}

export const exp = 0