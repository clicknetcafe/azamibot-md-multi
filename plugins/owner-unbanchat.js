import db from '../lib/database.js'

let handler = async (m, { text }) => {
	if (!text) {
		db.data.chats[m.chat].isBanned = false
		m.reply('Bot dapat digunakan kembali.')
	} else {
		try {
			db.data.chats[`${text.includes('@') ? text : text + '@g.us'}`].isBanned = false
			m.reply('Bot dapat digunakan kembali.')
		} catch (e) {
			console.log(e)
			m.reply(`ID Grup tidak ada dalam database.`)
		}
	}
}

handler.menugroup = ['unbanchat']
handler.tagsgroup = ['owner']
handler.command = /^(unbanchat)$/i

handler.owner = true

export default handler