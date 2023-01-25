import db from '../lib/database.js'
import { caklontong } from '@bochilteam/scraper'

let timeout = 120000
let poin = 1999
let handler = async (m, { conn, usedPrefix, isPrems }) => {
	let chat = db.data.chats[m.chat]
	if (!chat.game && m.isGroup) return
	conn.caklontong = conn.caklontong ? conn.caklontong : {}
	let id = m.chat
	if (id in conn.caklontong) {
		conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.caklontong[id][0])
		throw false
	}
	if (db.data.users[m.sender].limit < 1 && db.data.users[m.sender].money > 50000 && !isPrems) throw `Beli limit dulu lah, duid lu banyak kan 😏`
	else if (db.data.users[m.sender].limit > 0 && !isPrems) db.data.users[m.sender].limit -= 1
	const json = await caklontong()
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
			if (conn.caklontong[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*\n${json.deskripsi}`, pauthor, ['caklontong', `${usedPrefix}caklontong`], conn.caklontong[id][0])
			delete conn.caklontong[id]
		}, timeout)
	]
	console.log(json.jawaban)
}

handler.menufun = ['caklontong (exp+)']
handler.tagsfun = ['game']
handler.command = /^(caklontong)$/i

handler.premium = true

export default handler