import db from '../../lib/database.js'

const cooldown = 86400000

let handler = async (m, { conn, command, text }) => {
	if (!text) return m.reply(`[!] Masukkan durasi *( dalam hari )*`)
	if (isNaN(text)) return m.reply(`[!] Durasi harus dalam format angka.`)
	let chat = db.data.chats[m.chat]
	if (chat.expired == 0) return m.reply('[ ! ] Tidak ada durasi, bot join permanen.')
	let durasi = parseInt(text)
	if (command.includes('min') || command.includes('kurang')) {
		chat.expired -= durasi * cooldown
		chat.joindate -= durasi * cooldown
	} 
	else {
		chat.expired += durasi * cooldown
		chat.joindate += durasi * cooldown
	}
	await conn.reply(m.chat, `${(command.includes('min') || command.includes('kurang')) ? 'Mengurangi' : 'Menambah'} durasi join di grup sebanyak *${durasi} hari*`, m)
}

handler.menuowner = ['addjoindurasi']
handler.tagsowner = ['owner']
handler.command = /^(((t|n)ambah|add|plus|min|kurang)((gro?up|join|sewa)dura(si|tion)|dura(si|tion)(gro?up|join|sewa)))$/i

handler.rowner = true
handler.group = true

export default handler