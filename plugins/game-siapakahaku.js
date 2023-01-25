import db from '../lib/database.js'
import { siapakahaku } from '@bochilteam/scraper'

let timeout = 120000
let poin = 3499
let handler = async (m, { conn, usedPrefix, isPrems }) => {
	let chat = db.data.chats[m.chat]
	if (!chat.game && m.isGroup) return
	conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
	let id = m.chat
	if (id in conn.siapakahaku) {
		conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.siapakahaku[id][0])
		throw false
	}
	if (db.data.users[m.sender].limit < 1 && db.data.users[m.sender].money > 50000 && !isPrems) throw `Beli limit dulu lah, duid lu banyak kan 😏`
	else if (db.data.users[m.sender].limit > 0 && !isPrems) db.data.users[m.sender].limit -= 1
	const json = await siapakahaku()
	let caption = `
🎮 *Siapakah Aku* 🎮

${json.soal}

⭔ Timeout *${(timeout / 1000).toFixed(2)} detik*
⭔ Bonus: ${poin} Money
`.trim()
	conn.siapakahaku[id] = [
		await conn.reply(m.chat, caption, m),
		json, poin,
		setTimeout(() => {
			if (conn.siapakahaku[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, pauthor, ['siapakahaku', `${usedPrefix}siapakahaku`], conn.siapakahaku[id][0])
			delete conn.siapakahaku[id]
		}, timeout)
	]
	console.log(json.jawaban)
}

handler.menufun = ['siapakahaku (money+)']
handler.tagsfun = ['game']
handler.command = /^(siapa(kah)?aku)$/i

handler.premium = true

export default handler