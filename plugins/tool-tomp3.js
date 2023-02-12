import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
	if (!/video/.test(mime)) throw `Reply video/audio with caption *${usedPrefix + command}*`
	let media = await q.download?.()
	let audio = await toAudio(media, 'mp4')
	audio = await audio.toBuffer()
	if (/toa/.test(command)) await conn.sendMsg(m.chat, { audio: audio, mimetype: 'audio/mp4' }, { quoted: m })
	else await conn.sendMsg(m.chat, {document: audio, mimetype: 'audio/mpeg', fileName: 'Convert by AzamiBot.mp3' }, { quoted : m })
}

handler.help = ['tomp3']
handler.tags = ['tools']
handler.command = /^(to(mp3|a(udio)?))$/i

export default handler