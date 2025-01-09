import yts from 'yt-search'
import { isUrl } from '../../lib/func.js'
import { ytdl, ytdl2, youtubeSearch } from '../../lib/scrape.js'

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
		let anu = await ytdl2(url);
		if (!anu.status) throw Error(anu.msg)
		anu = anu.data
		await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: anu.audio }, mimetype: 'audio/mpeg', fileName: `${anu.title}.mp3` }, m, anu.title, anu.thumb, url)
	} catch (e) {
		console.log(e)
		try {
			/*const anu = await ytdl(url);
			let aud = anu.resultUrl.audio[0]
			await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: await aud.download() }, mimetype: 'audio/mpeg', fileName: `${anu.result.title}.mp3` }, m, anu.result.title, 'https://i.ibb.co.com/txJrWCZ/images-8.jpg', url)*/
			let anu = await (await fetch('https://api.siputzx.my.id/api/d/ytmp3?url='+url)).json()
			if (!anu.error) {
				anu = anu.data
				await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: anu.dl }, mimetype: 'audio/mpeg', fileName: `${anu.title}.mp3` }, m, anu.title, 'https://i.ibb.co.com/txJrWCZ/images-8.jpg', url)
			} else {
				let anu = await (await fetch('https://api.siputzx.my.id/api/d/ytmp3?url='+url)).json()
				if (!anu.error) {
					let anu = await (await fetch('https://api.siputzx.my.id/api/dl/youtube/mp3?url='+url)).json()
					if (!anu.error) {
						await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: anu.data }, mimetype: 'audio/mpeg', fileName: `unnamed.mp3` }, m, 'unnamed', 'https://i.ibb.co.com/txJrWCZ/images-8.jpg', url)
					} else m.reply(anu.error)
				}
			}
		} catch (e) {
			console.log(e)
			m.reply(e.message)
		}
	}
}

handler.menudownload = ['ytplay <teks> / <url>']
handler.tagsdownload = ['search']
handler.command = /^(play|(play)?yt(play|dl)?)$/i

export default handler