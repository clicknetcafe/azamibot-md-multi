import Connection from '../../lib/connection.js'
import { delay, ranNumb } from '../../lib/func.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let chats = Object.entries(Connection.store.chats).filter(([_, chat]) => !jid.endsWith('@g.us') && !_.startsWith('212') && chat.isChats).map(v => v[0])
	let img, q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (!text) throw `teks nya mana ?`
	if (mime) img = await q.download?.()
	conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m)
	let teks = `_*「 BroadCast-Bot 」*_${text ? ('\n\n'+text) : ''}`
	for (let id of chats) {
		try {
			if (/image|video/g.test(mime)) await conn.sendFile(id, img, '', teks, fkontakbot)
			else await conn.reply(id, teks, fkontakbot)
		} catch (e) {
			console.log(e)
		}
		await delay(ranNumb(3000, 6000))
	}
	await m.reply('Selesai Broadcast All Private Chat :)')
}

handler.menuowner = ['bcprivate']
handler.tagsowner = ['owner']
handler.command = /^((bc|broadcast)(c|chats?|pc|private))$/i

handler.owner = true

export default handler