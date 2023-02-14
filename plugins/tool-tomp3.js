import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
	if (!/audio|video/.test(mime)) throw `Reply video/audio with caption *${usedPrefix + command}*`
	let media = await q.download?.()
	if (/video/.test(mime)) media = await toAudio(media, 'mp4').then((data) => data.toBuffer())
	await conn.sendMsg(m.chat, /toa/.test(command) ? { audio: media, mimetype: 'audio/mp4' } : { document: media, mimetype: 'audio/mpeg', fileName: 'Convert by AzamiBot.mp3' }, { quoted: m })
}

handler.help = ['tomp3']
handler.tags = ['tools']
handler.command = /^(to(mp3|a(udio)?))$/i

export default handler