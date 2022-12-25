import db from '../lib/database.js'

let handler = async (m, { conn }) => {
	let chat = db.data.chats[m.chat]
	if (chat.expired == 0 || chat.expired == null) return m.reply(`[ ! ] Bot join permanen, tidak ada durasi.`)
	await conn.sendMessage(m.chat, { text: `Sisa Waktu Sewa :\n\n*${((chat.joindate + chat.joincd) - new Date()).toTimeString()}*` }, { quoted: m })
}

handler.mengroup = ['durasisewa']
handler.tagsgroup = ['group']
handler.command = /^((cek)?(durasi|info)(sewa|join)(bot)?)$/i

handler.owner = true
handler.group = true

export default handler