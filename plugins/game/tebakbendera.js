import db from '../../lib/database.js'

let timeout = 120000
let poin = 1999
let handler = async (m, { conn, usedPrefix, isPrems }) => {
	conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
	let id = m.chat
	if (id in conn.tebakbendera) {
		conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakbendera[id][0])
		throw false
	}
	let usr = db.data.users[m.sender]
	if (usr.limit < 1 && usr.money > 50000 && !isPrems) throw `Beli limit dulu lah, duid lu banyak kan 😏`
	else if (usr.limit > 0 && !isPrems) usr.limit -= 1
	let res = await fetch('https://raw.githubusercontent.com/clicknetcafe/Databasee/main/games/tebakbendera.json')
	if (!res.ok) throw 'Fitur Error!'
	let json = await res.json()
	json = json.getRandom().result
	let caption = `
🎮 *Tebak Bendera* 🎮

*Bendera :* ${json.bendera}

⭔ Timeout *${(timeout / 1000).toFixed(2)} detik*
⭔ Bonus: ${poin} Exp
`.trim()
	conn.tebakbendera[id] = [
		//await conn.sendMsg(m.chat, { image: { url: json.result.img }, caption: caption }, { quoted: m }),
		await conn.reply(m.chat, caption, m),
		json, poin,
		setTimeout(() => {
			if (conn.tebakbendera[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*`, conn.tebakbendera[id][0])
			delete conn.tebakbendera[id]
		}, timeout)
	]
	console.log(json.nama)
}

handler.menufun = ['tebakbendera (exp+)']
handler.tagsfun = ['game']
handler.command = /^(tebakbendera)$/i

handler.premium = true
handler.game = true

export default handler