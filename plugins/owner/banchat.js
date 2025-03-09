import db from '../../lib/database.js'
const { proto } = await (await import('@whiskeysockets/baileys')).default

let handler = async (m, { args, conn }) => {
	let id = args[0] ? args[0] : m.isGroup ? m.chat : ''
	if (!id) throw `input group id !`
	let chat = db.data.chats[id]
	if (!chat) return m.reply(`[!] Invalid ID Group`)
	chat.isBanned = true
	chat.permaBan = true
	chat.spamcount = 0
	chat.lastmute = 0
	chat.mutecd = 0
	try {
		let msg = await conn.reply(id, 'Bot dalam mode nyimak.', m)
		let pin = db.data.chats[id].pinmsg
		pin['banchat'] = msg.key
		await conn.sendMsg(id, { pin: pin['banchat'], type: proto.PinInChat.Type['PIN_FOR_ALL'], time: 86400 })
	} catch (e) {
		console.log(e)
		m.reply(e.message)
	}
}

handler.menuowner = ['banchat']
handler.tagsowner = ['owner']
handler.command = /^(banchat)$/i

handler.owner = true

export default handler