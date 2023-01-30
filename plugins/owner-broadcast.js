import { delay, ranNumb } from '../lib/others.js'

let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
	let chats = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats && !_.startsWith('212')).map(v => v[0])
	let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
	let img, q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || q.mtype || ''
	if (!text) throw `teks nya mana ?`
	if (mime) img = await q.download?.()
	conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m)
	let teks = command.includes('meme') ? `${text}\n\n_*「 Just BC-Bot 」*_` : `_*「 BroadCast-Bot 」*_\n\n${text}`
	for (let id of chats) {
		try {
			if (/image|video|viewOnce/g.test(mime)) {
				if (id.includes('@g.us')) {
					if (command.includes('meme')) await conn.sendFile(id, img, '', teks, null, false, { mentions: participants.map(a => a.id) })
					else await conn.sendButton(id, teks, pauthor, img, [[`👥 Owner`, `.owner`],[`🤖 Menu`, `.menu`]], null, { mentions: participants.map(a => a.id) })
				} else {
					if (command.includes('meme')) await conn.sendFile(id, img, '', teks)
					else await conn.sendButton(id, teks, pauthor, img, [[`👥 Owner`, `.owner`],[`🤖 Menu`, `.menu`]])
				}
			} else {
				if (id.includes('@g.us')) await conn.sendMessage(id, { text: teks, mentions: participants.map(a => a.id) })
				else await conn.sendMessage(id, { text: teks })
			}
		} catch (e) {
			console.log(e)
		}
		await delay(ranNumb(3000, 7000))
	}
	await m.reply('Selesai Broadcast All Chat :)')
}

handler.menuowner = ['bc', 'bcmeme']
handler.tagsowner = ['owner']
handler.command = /^((broadcast|bc)(meme)?)$/i

handler.owner = true

export default handler