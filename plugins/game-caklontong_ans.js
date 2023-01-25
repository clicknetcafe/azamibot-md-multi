import db from '../lib/database.js'
import similarity from 'similarity'
const threshold = 0.72

export async function before(m) {
	let user = db.data.users[m.sender]
	if (user.banned) return null
	let id = m.chat
	if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text)
		return !0
	this.caklontong = this.caklontong ? this.caklontong : {}
	if (!(id in this.caklontong))
		return
	if (m.quoted.id == this.caklontong[id][0].id) {
		let json = JSON.parse(JSON.stringify(this.caklontong[id][1]))
		if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
			user.exp += this.caklontong[id][2]
			this.sendButton(m.chat, `*Benar!* 🎉\n${json.deskripsi}\n\n+${this.caklontong[id][2]} Exp`, pauthor, ['caklontong', '/caklontong'], m)
			clearTimeout(this.caklontong[id][3])
			delete this.caklontong[id]
		} else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
			m.reply(`*Dikit Lagi!*`)
		else
			m.reply(`*Salah!*`)
	}
	return !0
}

export const exp = 0