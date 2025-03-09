import db from '../../lib/database.js'
const { proto } = await (await import('@whiskeysockets/baileys')).default

let handler = async (m, { text, conn }) => {
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
	let pin = db.data.datas.pinmsg
	if (pin['banchat']) {
		await conn.sendMsg(m.chat, { pin: pin['banchat'], type: proto.PinInChat.Type['UNPIN_FOR_ALL'] })
		delete pin['banchat']
	}
}

handler.menuowner = ['unbanchat']
handler.tagsowner = ['owner']
handler.command = /^(unbanchat)$/i

handler.owner = true

export default handler