import db from '../../lib/database.js'

let timeout = 120000
let poin = 1999
let handler = async (m, { conn, usedPrefix, isPrems }) => {
	let chat = db.data.chats[m.chat]
	conn.asahotak = conn.asahotak ? conn.asahotak : {}
	let id = m.chat
	if (id in conn.asahotak) {
		conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.asahotak[id][0])
		throw false
	}
	let json, usr = db.data.users[m.sender]
	if (usr.limit < 1 && usr.money > 50000 && !isPrems) throw `Beli limit dulu lah, duid lu banyak kan 😏`
	else if (usr.limit > 0 && !isPrems) usr.limit -= 1
	try {
		json = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json')).json()
	} catch (e) {
		console.log(e)
		return m.reply(e.message)
	}
	json = json.getRandom()
	let caption = `
🎮 *Asah Otak* 🎮

${json.soal}

⭔ Timeout *${(timeout / 1000).toFixed(2)} detik*
⭔ Bonus: ${poin} Exp
`.trim()
	conn.asahotak[id] = [
		await conn.reply(m.chat, caption, m),
		json, poin,
		setTimeout(() => {
			if (conn.asahotak[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.asahotak[id][0])
			delete conn.asahotak[id]
		}, timeout)
	]
	console.log(json.jawaban)
}

handler.menufun = ['asahotak (exp+)']
handler.tagsfun = ['game']
handler.command = /^(asahotak)$/i

handler.premium = true
handler.game = true

export default handler