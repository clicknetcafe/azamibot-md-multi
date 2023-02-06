import fetch from 'node-fetch'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'
import { niceBytes, somematch } from '../lib/others.js'

let handler = async (m, { conn, text, args, command }) => {
	if (!text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	try {
		const { audio: _audio, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
		let audio, source, res, link, lastError, sizeh
		for (let i in _audio) {
			try {
				audio = _audio[i]
				link = await audio.download()
				sizeh = await audio.fileSize
				if (link) res = await fetch(link)
				if (res) source = await res.arrayBuffer()
				if (source instanceof ArrayBuffer) break
			} catch (e) {
				audio = link = source = null
				lastError = e
			}
		}
		if (sizeh > 300000) throw `Filesize: ${audio.fileSizeH}\nTidak dapat mengirim, maksimal file 300 MB`
		if (!link) throw new Error('No URL')
		if (command.includes('mp3')) await conn.sendFile(m.chat, link, `${title}.mp3`, '', m, false, { asDocument: true, mimetype: 'audio/mpeg' })
		else await conn.sendFile(m.chat, link, '', '', m, false, { mimetype: 'audio/mp4' })
	} catch (e) {
		console.log(e)
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/ytaudio?apikey=${apilol}&url=${text}`)
			let anu = await res.json()
			anu = anu.result
			let vsize = anu.link.size.slice(-2)
			if (vsize == "GB") return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.link.size}`)
			if (!somematch(['kB','KB'], vsize) && parseInt(anu.link.size.replace(" MB", "")) > 200) return m.reply(`Filesize: ${anu.link.size}\nTidak dapat mengirim, maksimal file 300 MB`)
			if (!anu.link.link) throw new Error('Error')
			if (command.includes('mp3')) await conn.sendFile(m.chat, anu.link.link, `${anu.title}.mp3`, '', m, false, { asDocument: true, mimetype: 'audio/mpeg' })
			else await conn.sendFile(m.chat, anu.link.link, '', '', m, false, { mimetype: 'audio/mp4' })
		} catch (e) {
			console.log(e)
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${apilol}&url=${text}`)
				let anu = await res.json()
				anu = anu.result
				let vsize = anu.size.slice(-2)
				if (vsize == "GB") return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.size}`)
				if (!somematch(['kB','KB'], vsize) && parseInt(anu.size.replace(" MB", "")) > 200) return m.reply(`Filesize: ${anu.size}\nTidak dapat mengirim, maksimal file 300 MB`)
				if (!anu.link) throw new Error('Error')
				if (command.includes('mp3')) await conn.sendFile(m.chat, anu.link, `${anu.title}.mp3`, '', m, false, { asDocument: true, mimetype: 'audio/mpeg' })
				else await conn.sendFile(m.chat, anu.link, '', '', m, false, { mimetype: 'audio/mp4' })
			} catch (e) {
				console.log(e)
				throw `Invalid Youtube URL / terjadi kesalahan.`
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

