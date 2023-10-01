import db from '../../lib/database.js'
import similarity from 'similarity'
const threshold = 0.72

export async function before(m) {
	let user = db.data.users[m.sender]
	if (!user || user.banned) return !1
	let id = m.chat
	if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text)
		return !0
	this.susunkata = this.susunkata ? this.susunkata : {}
	if (!(id in this.susunkata))
		return
	if (m.quoted.id == this.susunkata[id][0].id) {
		let json = JSON.parse(JSON.stringify(this.susunkata[id][1]))
		if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
			user.money += this.susunkata[id][2]
			user.spamcount += 2
			this.reply(m.chat, `*Benar!* 🎉\n\n+${this.susunkata[id][2]} Money`, m)
			clearTimeout(this.susunkata[id][3])
			delete this.susunkata[id]
		} else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
			m.reply(`*Dikit Lagi!*`)
		else
			m.reply(`*Salah!*`)
	}
	return !0
}

export const money = 0