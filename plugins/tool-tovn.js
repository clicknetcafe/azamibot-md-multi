import { toPTT } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/audio|video/.test(mime)) {
		let media = await q.download?.()
		if (/video/.test(mime)) media = await toPTT(media, 'mp4').then((data) => data.toBuffer())
		await conn.sendMsg(m.chat, { audio: media, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
	} else throw `Reply video/audio with caption *${usedPrefix + command}*`
}

handler.help = ['tovn (reply)']
handler.tags = ['tools']
handler.command = /^((to)?(vn|ptt))$/i

export default handler