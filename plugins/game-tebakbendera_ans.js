import db from '../lib/database.js'
import similarity from 'similarity'
const threshold = 0.72

export async function before(m) {
	let user = db.data.users[m.sender]
	if (user.banned) return null
	let id = m.chat
	if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text)
		return !0
	this.tebakbendera = this.tebakbendera ? this.tebakbendera : {}
	if (!(id in this.tebakbendera))
		return
	if (m.quoted.id == this.tebakbendera[id][0].id) {
		let json = JSON.parse(JSON.stringify(this.tebakbendera[id][1]))
		if (m.text.toLowerCase() == json.result.name.toLowerCase().trim()) {
			user.exp += this.tebakbendera[id][2]
			this.sendButton(m.chat, `*Benar!* 🎉\n\n+${this.tebakbendera[id][2]} Exp`, pauthor, ['tebakbendera', '/tebakbendera'], m)
			clearTimeout(this.tebakbendera[id][3])
			delete this.tebakbendera[id]
		} else if (similarity(m.text.toLowerCase(), json.result.name.toLowerCase().trim()) >= threshold)
			m.reply(`*Dikit Lagi!*`)
		else
			m.reply(`*Salah!*`)
	}
	return !0
}

export const exp = 0