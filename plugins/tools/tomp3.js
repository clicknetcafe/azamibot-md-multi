import { toAudio } from '../../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/audio|video/.test(mime)) {
		try {
			let media = await q.download?.()
			if (/video/.test(mime)) media = await toAudio(media, 'mp4').then((data) => data.toBuffer())
			await conn.sendFile(m.chat, media, `Convert by ${packname}.mp3`, '', m, /vn/.test(command) ? true : false, /mp3/.test(command) ? { asDocument: true } : {}, true)
		} catch (e) {
			console.log(e)
			m.reply(e.message)
		}
	} else throw `Reply video/audio with caption *${usedPrefix + command}*`
}

handler.help = ['toaudio','tomp3','tovn'].map(v => v+' (reply)')
handler.tags = ['tools']
handler.command = /^(to(vn|a(udio)?|mp3))$/i

export default handler