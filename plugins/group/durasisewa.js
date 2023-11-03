import db from '../../lib/database.js'

let handler = async (m, { conn }) => {
	let chat = db.data.chats[m.chat]
	if (chat.expired == 0 || chat.expired == null) return m.reply(`[ ! ] Bot join permanen, tidak ada durasi.`)
	await conn.reply(m.chat, `Sisa Waktu Sewa :\n\n*${((chat.joindate + chat.joincd) - new Date()).toTimeString()}*`, m)
}

handler.menugroup = ['durasisewa']
handler.tagsgroup = ['group']
handler.command = /^((cek)?(durasi|info)(sewa|join)(bot)?)$/i

handler.group = true

export default handler