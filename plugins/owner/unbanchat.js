import db from '../../lib/database.js'

let handler = async (m, { text }) => {
	let id = m.isGroup ? m.chat : text ? `${text.includes('@') ? text : text + '@g.us'}` : ''
	if (!id) return m.reply('[!] Gunakan di Grup / masukkan ID Grup')
	try {
		let chat = db.data.chats[id]
		chat.isBanned = false
		chat.permaBan = false
		chat.lastmute = 0
		chat.mutecd = 0
		m.reply('Bot dapat digunakan kembali.')
	} catch (e) {
		console.log(e)
		m.reply(`ID Grup tidak ada dalam database.`)
	}
}

handler.menuowner = ['unbanchat']
handler.tagsowner = ['owner']
handler.command = /^(unbanchat)$/i

handler.owner = true

export default handler