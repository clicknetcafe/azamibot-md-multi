import db from '../../lib/database.js'

let timeout = 120000
let poin = 1999
let handler = async (m, { conn, usedPrefix, isPrems }) => {
	conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {}
	let id = m.chat
	if (id in conn.tebaklirik) {
		conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebaklirik[id][0])
		throw false
	}
	let json, usr = db.data.users[m.sender]
	if (usr.limit < 1 && usr.money > 50000 && !isPrems) throw `Beli limit dulu lah, duid lu banyak kan 😏`
	else if (usr.limit > 0 && !isPrems) usr.limit -= 1
	try {
		json = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json')).json()
	} catch (e) {
		console.log(e)
		return m.reply(e.message)
	}
	json = json.getRandom()
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
			if (conn.tebaklirik[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebaklirik[id][0])
			delete conn.tebaklirik[id]
		}, timeout)
	]
	console.log(json.jawaban)
}

handler.menufun = ['tebaklirik (exp+)']
handler.tagsfun = ['game']
handler.command = /^(tebaklirik)$/i

handler.premium = true
handler.game = true

export default handler