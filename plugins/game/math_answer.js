import db from '../../lib/database.js'

let handler = m => m
handler.before = async function (m) {
	if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
	let id = m.chat
	if (!m.quoted || !m.quoted.fromMe || !m.text || !/^Berapa hasil dari/i.test(m.quoted.text)) return !0
	this.math = this.math ? this.math : {}
	if (!(id in this.math)) return this.reply(m.chat, 'Soal itu telah berakhir', m)
	if (m.quoted.id == this.math[id][0].id) {
		let user = db.data.users[m.sender]
		let math = JSON.parse(JSON.stringify(this.math[id][1]))
		if (m.text == math.result) {
			user.money += math.bonus
			user.spamcount += 2
			clearTimeout(this.math[id][3])
			delete this.math[id]
			this.reply(m.chat, `*Jawaban Benar!*\n+${math.bonus} Money`, m)
		} else {
			if (--this.math[id][2] == 0) {
				clearTimeout(this.math[id][3])
				delete this.math[id]
				this.reply(m.chat, `*Kesempatan habis!*\nJawaban: *${math.result}*`, m)
			} else await m.reply(`*Jawaban Salah!*\nMasih ada ${this.math[id][2]} kesempatan`)
		}
	}
	return !0
}

export default handler