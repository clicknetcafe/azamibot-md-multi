import { delay, ranNumb } from '../lib/others.js'

let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
	let chats = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
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
				if (command.includes('meme')) await conn.sendFile(id, img, '', teks, null, false, { mentions: participants.map(a => a.id) })
				else await conn.sendButton(id, teks, pauthor, img, [[`👥 Owner`, `.owner`],[`🤖 Menu`, `.menu`]], null, { mentions: participants.map(a => a.id) })
			} else await conn.sendMessage(id, { text: teks, mentions: participants.map(a => a.id) })
		} catch (e) {
			console.log(e)
		}
		await delay(ranNumb(2000, 5500))
	}
	await m.reply('Selesai Broadcast All Group Chat :)')
}

handler.menuowner = ['bcgroup', 'bcgroupmeme']
handler.tagsowner = ['owner']
handler.command = /^((bc|broadcast)(gc|gro?ups?)(meme)?)$/i

handler.owner = true

export default handler