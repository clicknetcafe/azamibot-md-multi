import { webp2mp4 } from '../lib/webp2mp4.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	if (!m.quoted) throw notStickerMessage
	const q = m.quoted || m
	let mime = q.mediaType || ''
	if (!/sticker|ptv/.test(mime)) throw `Reply sticker / ptv with command *${usedPrefix + command}*`
	let media = await q.download()
	let out = /ptv/.test(mime) ? media : await webp2mp4(media).catch(_ => null) || Buffer.alloc(0)
	await conn.sendFile(m.chat, out, 'out.mp4', '*DONE*', m)
}

handler.help = ['ptvtovideo','tomp4']
handler.tags = ['tools']
handler.command = /^((ptv)?to(mp4|video))$/i

export default handler