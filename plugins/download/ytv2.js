import ytdl from 'ytdl-core'
import { niceBytes } from '../../lib/func.js'
import { youtubedl } from '@bochilteam/scraper-sosmed'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	let za = /360/.test(command) ? '360' : /480/.test(command) ? '480' : command.includes('720') ? '720' : '1080'
	try {
		let anu = await outubedl(args[0])
		let list = Object.keys(anu.video).toString()
		let data = anu.video[`${za}p`]
		let url = await data.download()
		if (data.fileSize > 400000) return m.reply(`Filesize: ${data.fileSizeH}\nTidak dapat mengirim, maksimal file 400 MB`)
		let txt = `*${anu.title}*\n\n`
		txt += `⭔ Watch : ${args[0]}\n`
		txt += `⭔ Resolution : ${data.quality}\n`
		txt += `⭔ Size : ${data.fileSizeH}`
		await conn.sendFile(m.chat, url, `${anu.title}.mp4`, txt, m)
	} catch (e) {
		console.log(e)
		try {
			let res = await ytdl.getURLVideoID(args[0])
			let anu = await ytdl.getInfo(res)
			let det = anu.videoDetails
			let data = anu.formats.find(v => v.mimeType.includes('video') && v.audioBitrate !== null && (v.qualityLabel || '').includes(za))
			if (!data) throw Error()
			let size = parseInt(data.bitrate)
			let buffer = Buffer.from(await (await fetch(data.url)).arrayBuffer())
			let buffl = Buffer.byteLength(buffer)
			if (size > 400000000) return m.reply(`Filesize: ${niceBytes(buffl)}\nTidak dapat mengirim, maksimal file 400 MB`)
			let txt = `*${det.title}*\n\n`
			+ `⭔ Watch : ${args[0]}\n`
			+ `⭔ Resolution : ${data.width} x ${data.height}\n`
			+ `⭔ Size : ${niceBytes(buffl)}`
			await conn.sendFile(m.chat, buffer, `${det.title}.mp4`, txt, m)
		} catch (e) {
			console.log(e)
			m.reply(`[!] ${za}p tidak tersedia / terjadi kesalahan.`)
		}
	}
}

handler.menudownload = ['360','480','720','1080'].map(v => 'ytvideo'+v+' <url>')
handler.tagsdownload = ['search']
handler.command = /^(yt(v(ideo)?|mp4)(360|480|720|1080)p?)$/i

handler.premium = true
handler.limit = true

export default handler