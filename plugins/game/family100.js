import db from '../../lib/database.js'
import { family100 } from '@bochilteam/scraper'
const winScore = 1499

async function handler(m, { conn, usedPrefix, isPrems }) {
	this.game = this.game ? this.game : {}
	let id = 'family100_' + m.chat
	if (id in this.game) {
		this.reply(m.chat, 'Masih ada kuis yang belum terjawab di chat ini', this.game[id].msg)
		throw false
	}
	let usr = db.data.users[m.sender]
	if (usr.limit < 1 && usr.money > 50000 && !isPrems) throw `Beli limit dulu lah, duid lu banyak kan 😏`
	else if (usr.limit > 0 && !isPrems) usr.limit -= 1
	const json = await family100()
	let caption = `
*Soal:* ${json.soal}
Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}
+${winScore} Money tiap jawaban benar
	`.trim()
	this.game[id] = {
		id,
		msg: await this.reply(m.chat, caption, m),
		...json,
		terjawab: Array.from(json.jawaban, () => false),
		winScore,
	}
}

handler.menufun = ['family100']
handler.tagsfun = ['game']
handler.command = /^(family100)$/i

handler.premium = true
handler.game = true

export default handler