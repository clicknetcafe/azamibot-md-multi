import db from '../../lib/database.js'

let timeout = 120000
let poin = 1999
let handler = async (m, { conn, usedPrefix, isPrems }) => {
	conn.caklontong = conn.caklontong ? conn.caklontong : {}
	let id = m.chat
	if (id in conn.caklontong) {
		conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.caklontong[id][0])
		throw false
	}
	let usr = db.data.users[m.sender]
	if (usr.limit < 1 && usr.money > 50000 && !isPrems) throw `Beli limit dulu lah, duid lu banyak kan 😏`
	else if (usr.limit > 0 && !isPrems) usr.limit -= 1
	try {
		json = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json')).json()
	} catch (e) {
		console.log(e)
		return m.reply(e.message)
	}
	json = json.getRandom()
	let caption = `
🎮 *Cak Lontong* 🎮

${json.soal}

⭔ Timeout *${(timeout / 1000).toFixed(2)} detik*
⭔ Bonus: ${poin} Exp
`.trim()
	conn.caklontong[id] = [
		await conn.reply(m.chat, caption, m),
		json, poin,
		setTimeout(() => {
			if (conn.caklontong[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*\n${json.deskripsi}`, conn.caklontong[id][0])
			delete conn.caklontong[id]
		}, timeout)
	]
	console.log(json.jawaban)
}

handler.menufun = ['caklontong (exp+)']
handler.tagsfun = ['game']
handler.command = /^(caklontong)$/i

handler.premium = true
handler.game = true

export default handler