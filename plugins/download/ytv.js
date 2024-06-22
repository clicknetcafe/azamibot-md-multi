import ytdl from 'ytdl-core'
import { niceBytes } from '../../lib/func.js'
import { youtubedl } from '@bochilteam/scraper-sosmed'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!(args[0] || '').match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	await conn.sendMsg(m.chat, { react: { text: '⌛', key: m.key } })
	try {
		let anu = await youtubedl(args[0])
		let list = Object.keys(anu.video).toString()
		let data = anu.video[`${list.includes('36') ? '360p' : list.includes('24') ? '240p' : '144p'}`]
		let url = await data.download()
		if (data.fileSize > 400000) return m.reply(`Filesize: ${data.fileSizeH}\nTidak dapat mengirim, maksimal file 400 MB`)
		let txt = `*${anu.title}*\n\n`
		+ `⭔ Watch : ${args[0]}\n`
		+ `⭔ Resolution : ${data.quality}\n`
		+ `⭔ Size : ${data.fileSizeH}`
		await conn.sendFile(m.chat, url, `${anu.title}.mp4`, txt, m)
	} catch (e) {
		console.log(e)
		try {
			let res = await ytdl.getURLVideoID(args[0])
			let anu = await ytdl.getInfo(res)
			let data, det = anu.videoDetails
			for (let x of ['360','480','240']) {
				if (!data) data = anu.formats.find(v => v.mimeType.includes('video') && v.audioBitrate !== null && (v.qualityLabel || '').includes(x))
			}
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
			try {
				let anu = await (await fetch(`https://rest-api.akuari.my.id/downloader/yt1?link=${args[0]}`)).json()
				let size = anu.urldl_video.size
				let vs = parseInt(size)
				if (isNaN(vs)) vs = 1
				if (vs > 400 && /mb|gb/i.test(size)) return m.reply(`Filesize: ${size}\nTidak dapat mengirim, maksimal file 400 MB`)
				let txt = `*${anu.info.title}*\n\n`
				+ `⭔ Watch : ${args[0]}\n`
				+ `⭔ Resolution : ${anu.urldl_video.quality}\n`
				+ `⭔ Size : ${size}`
				await conn.sendFile(m.chat, anu.urldl_video.link, `${anu.info.title}.mp4`, txt, m)
			} catch (e) {
				console.log(e)
				throw 'invalid url / internal server error.'
			}
		}
	}
}

handler.menudownload = ['ytvideo <url>']
handler.tagsdownload = ['search']
handler.command = /^(yt(v(ideo)?|mp4))$/i

handler.premium = true
handler.limit = true

export default handler