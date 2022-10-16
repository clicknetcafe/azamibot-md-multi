import { webp2mp4 } from '../lib/webp2mp4.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	const notStickerMessage = `Reply sticker with command *${usedPrefix + command}*`
	if (!m.quoted) throw notStickerMessage
	const q = m.quoted || m
	let mime = q.mediaType || ''
	if (!/sticker/.test(mime)) throw notStickerMessage
	let media = await q.download()
	let out = await webp2mp4(media).catch(_ => null) || Buffer.alloc(0)
	await conn.sendFile(m.chat, out, 'out.mp4', '*DONE*', m)
}

handler.help = ['tomp4']
handler.tags = ['tools']
handler.command = /^tomp4|tovideo$/i

export default handler