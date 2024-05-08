import ytdl from 'ytdl-core'
import yts from 'yt-search'
import { youtubeSearch, youtubedl } from '@bochilteam/scraper-sosmed'
import { isUrl, niceBytes } from '../../lib/func.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Sia Unstopable`
	let url = ''
	await conn.sendMsg(m.chat, { react: { text: '⌛', key: m.key } })
	if (!isUrl(text)) {
		try {
			let anu = await youtubeSearch(text)
			let f = anu.video.filter(v => !v.url.includes('@'))
			url = f[0].url
			if (!url) throw Error()
		} catch (e) {
			console.log(e)
			try {
				let anu = await yts(text)
				let f = anu.all.filter(v => !v.url.includes('@'))
				url = f[0].url
				if (!url) throw Error()
			} catch (e) {
				console.log(e)
				return m.reply(`Tidak ditemukan hasil.`)
			}
		}
	} else url = text
	if (!url) return
	try {
		let res = await youtubedl(url)
		let data = res.audio[Object.keys(res.audio)[0]]
		let site = await data.download()
		if (data.fileSize > 400000) return m.reply(`Filesize: ${data.fileSizeH}\nTidak dapat mengirim, maksimal file 400 MB`)
		await conn.sendFAudio(m.chat, { audio: { url: site }, mimetype: 'audio/mpeg', fileName: `${res.title}.mp3` }, m, res.title, res.thumbnail, url)
	} catch (e) {
		console.log(e)
		try {
			let res = await ytdl.getURLVideoID(url)
			let anu = await ytdl.getInfo(res)
			let det = anu.videoDetails
			anu = anu.formats.filter(v => v.mimeType.includes('audio/mp4'))[0]
			let size = parseInt(anu.contentLength)
			if (size > 400000000) return m.reply(`Filesize: ${niceBytes(size)}\nTidak dapat mengirim, maksimal file 400 MB`)
			await conn.sendFAudio(m.chat, { audio: { url: anu.url }, mimetype: 'audio/mpeg', fileName: `${det.title}.mp3` }, m, det.title, det.thumbnails.pop().url, url)
		} catch (e) {
			console.log(e)
			m.reply('tidak ditemukan hasil.')
		}
	}
}

handler.menudownload = ['ytplay <teks> / <url>']
handler.tagsdownload = ['search']
handler.command = /^(play|(play)?yt(play|dl)?)$/i

export default handler