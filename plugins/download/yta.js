import ytdl from 'ytdl-core'
import { youtubedl } from '@bochilteam/scraper-sosmed'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Example: ${usedPrefix + command} https://youtu.be/zcRGPmEawmk`
	if (!args[0].match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	await conn.sendMsg(m.chat, { react: { text: '⌛', key: m.key } })
	try {
		let anu = await youtubedl(args[0])
		let data = anu.audio[Object.keys(anu.audio)[0]]
		let url = await data.download()
		if (data.fileSize > 400000) return m.reply(`Filesize: ${data.fileSizeH}\nTidak dapat mengirim, maksimal file 400 MB`)
		await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: url }, mimetype: 'audio/mpeg', fileName: `${anu.title}.mp3` }, m, anu.title, anu.thumbnail, args[0])
	} catch (e) {
		console.log(e)
		try {
			let res = await ytdl.getURLVideoID(args[0])
			let anu = await ytdl.getInfo(res)
			let det = anu.videoDetails
			anu = anu.formats.filter(v => v.mimeType.includes('audio/mp4'))[0]
			let size = parseInt(anu.contentLength)
			if (size > 400000000) return m.reply(`Filesize: ${niceBytes(size)}\nTidak dapat mengirim, maksimal file 400 MB`)
			await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: anu.url }, mimetype: 'audio/mpeg', fileName: `${det.title}.mp3` }, m, det.title, det.thumbnails.pop().url, args[0])
		} catch (e) {
			console.log(e)
			try {
				let anu = await (await fetch(`https://rest-api.akuari.my.id/downloader/yt1?link=${args[0]}`)).json()
				let size = anu.urldl_audio.size
				let vs = parseInt(size)
				if (isNaN(vs)) vs = 1
				if (vs > 400 && /mb|gb/i.test(size)) return m.reply(`Filesize: ${size}\nTidak dapat mengirim, maksimal file 400 MB`)
				await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: anu.urldl_audio.link }, mimetype: 'audio/mpeg', fileName: `${anu.info.title}.mp3` }, m, anu.info.title, anu.info.thumbnail, args[0])
			} catch (e) {
				console.log(e)
				throw 'invalid url / internal server error.'
			}
		}
	}
}

handler.menudownload = ['ytaudio <url>']
handler.tagsdownload = ['search']
handler.command = /^(yt(a(udio)?|mp3))$/i

handler.premium = true
handler.limit = true

export default handler

