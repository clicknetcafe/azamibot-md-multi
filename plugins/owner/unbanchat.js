import db from '../../lib/database.js'

let handler = async (m, { text }) => {
	let id = m.isGroup ? m.chat : text ? `${text.includes('@') ? text : text + '@g.us'}` : ''
	if (!id) return m.reply('[!] Gunakan di Grup / masukkan ID Grup')
	let chat = db.data.chats[id]
	if (!chat) return m.reply(`ID Grup tidak ada dalam database.`)
	chat.isBanned = false
	chat.permaBan = false
	chat.spamcount = 0
	chat.lastmute = 0
	chat.mutecd = 0
	m.reply('Bot dapat digunakan kembali.')
}

handler.menuowner = ['unbanchat']
handler.tagsowner = ['owner']
handler.command = /^(unbanchat)$/i

handler.owner = true

export default handler