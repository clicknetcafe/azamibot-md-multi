import Connection from '../lib/connection.js'
import { delay, ranNumb } from '../lib/others.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let chats = Object.entries(Connection.store.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && !jid.startsWith('212') && chat.isChats).map(v => v[0])
	let img, q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || q.mtype || ''
	if (!text) throw `teks nya mana ?`
	if (mime) img = await q.download?.()
	conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m)
	let teks = command.includes('meme') ? `${text}\n\n_*「 BroadCast-Bot 」*_` : `_*「 BroadCast-Bot 」*_\n\n${text}`
	for (let id of chats) {
		try {
			if (/image|video|viewOnce/g.test(mime)) await conn.sendFile(id, img, '', teks)
			else await conn.reply(id, teks)
		} catch (e) {
			console.log(e)
		}
		await delay(ranNumb(3000, 6000))
	}
	await m.reply('Selesai Broadcast All Private Chat :)')
}

handler.menuowner = ['bcprivate', 'bcprivatememe']
handler.tagsowner = ['owner']
handler.command = /^((bc|broadcast)(c|chats?|pc|private)(meme)?)$/i

handler.owner = true

export default handler