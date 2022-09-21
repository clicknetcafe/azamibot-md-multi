import { toPTT } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `Reply video/audio with caption *${usedPrefix + command}*`
    let media = await q.download?.()
    if (!media) throw 'Can\'t download media'
    let audio = await toPTT(media, 'mp4')
    if (!audio.data) throw 'Can\'t convert media to audio'
	await conn.sendMessage(m.chat, { audio: audio.data, mimetype: 'audio/mpeg', ptt: true }, { quoted: m })
}
handler.help = ['tovn (reply)']
handler.tags = ['tools']

handler.command = /^to(vn|(ptt)?)$/i

export default handler