import db from '../lib/database.js'

let handler = async (m, { text }) => {
	let id
	if (!text) id = m.chat
	else id = `${text.includes('@') ? text : text + '@g.us'}`
	try {
		if (!text && !m.isGroup) return m.reply(`*「GROUP ONLY」*`)
		let chat = db.data.chats[id]
		if (chat.mutecd != 0) return m.reply(`[!] Tidak dapat *unbanchat* karena sudah di *mute*`)
		chat.isBanned = false
		m.reply('Bot dapat digunakan kembali.')
	} catch (e) {
		console.log(e)
		m.reply(`ID Grup tidak ada dalam database.`)
	}
}

handler.menugroup = ['unbanchat']
handler.tagsgroup = ['owner']
handler.command = /^(unbanchat)$/i

handler.owner = true

export default handler