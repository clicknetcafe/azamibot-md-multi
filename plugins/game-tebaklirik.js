import db from '../lib/database.js'
import { tebaklirik } from '@bochilteam/scraper'

let timeout = 120000
let poin = 1999
let handler = async (m, { conn, usedPrefix, isPrems }) => {
	if (m.isGroup && !db.data.chats[m.chat].game) return
	conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {}
	let id = m.chat
	if (id in conn.tebaklirik) {
		conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebaklirik[id][0])
		throw false
	}
	if (db.data.users[m.sender].limit < 1 && db.data.users[m.sender].money > 50000 && !isPrems) throw `Beli limit dulu lah, duid lu banyak kan 😏`
	else if (db.data.users[m.sender].limit > 0 && !isPrems) db.data.users[m.sender].limit -= 1
	const json = await tebaklirik()
	let caption = `
🎮 *Tebak Lirik* 🎮

${json.soal}

⭔ Timeout *${(timeout / 1000).toFixed(2)} detik*
⭔ Bonus: ${poin} Exp
`.trim()
	conn.tebaklirik[id] = [
		await conn.reply(m.chat, caption, m),
		json, poin,
		setTimeout(() => {
			if (conn.tebaklirik[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, pauthor, ['tebaklirik', `${usedPrefix}tebaklirik`], conn.tebaklirik[id][0])
			delete conn.tebaklirik[id]
		}, timeout)
	]
	console.log(json.jawaban)
}

handler.menufun = ['tebaklirik (exp+)']
handler.tagsfun = ['game']
handler.command = /^(tebaklirik)$/i

handler.premium = true

export default handler