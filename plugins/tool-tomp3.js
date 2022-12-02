import { ranNumb, padLead } from '../lib/others.js'
import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
		let q = m.quoted ? m.quoted : m
		let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
		if (!/video|audio/.test(mime)) throw `Reply video/audio with caption *${usedPrefix + command}*`
		let media = await q.download?.()
		if (!media) throw 'Can\'t download media'
		let audio = await toAudio(media, 'mp4')
		if (!audio.data) throw 'Can\'t convert media to audio'
		if (command.includes('toa')) {
			await conn.sendMessage(m.chat, { audio: audio.data, mimetype: 'audio/mp4' }, { quoted: m })
		} else {
			let date = new Date().toISOString().replace('-', '').split('T')[0].replace('-', '')
			let meh = padLead(ranNumb(9999), 4)
			await conn.sendMessage(m.chat, {document: audio.data, mimetype: 'audio/mpeg', fileName: `AUD-${date}-WA${meh}.mp3`}, { quoted : m })
		}
}

handler.help = ['tomp3']
handler.tags = ['tools']
handler.command = /^(to(mp3|a(udio)?))$/i

export default handler