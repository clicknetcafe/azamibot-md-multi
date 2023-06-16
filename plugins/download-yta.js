import fetch from 'node-fetch'
import { youtubedl } from '@bochilteam/scraper-sosmed'
import { somematch } from '../lib/others.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Example: ${usedPrefix + command} https://youtu.be/zcRGPmEawmk`
	if (!args[0].match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	try {
		let anu = await youtubedl(args[0])
		let data = anu.audio[Object.keys(anu.audio)[0]]
		let url = await data.download()
		if (data.fileSize > 400000) return m.reply(`Filesize: ${data.fileSizeH}\nTidak dapat mengirim, maksimal file 400 MB`)
		await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: url }, mimetype: 'audio/mpeg', fileName: `${anu.title}.mp3` }, m, anu.title, anu.thumbnail, args[0])
	} catch (e) {
		console.log(e)
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/ytaudio?apikey=${apilol}&url=${args[0]}`)
			let anu = await res.json()
			anu = anu.result
			let vsize = anu.link.size.slice(-2)
			if (vsize == "GB") return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.link.size}`)
			if (!somematch(['kB','KB'], vsize) && parseInt(anu.link.size.replace(" MB", "")) > 400) return m.reply(`Filesize: ${anu.link.size}\nTidak dapat mengirim, maksimal file 400 MB`)
			if (!anu.link.link) throw new Error('Error')
			await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: anu.link.link }, mimetype: 'audio/mpeg', fileName: `${anu.title}.mp3` }, m, anu.title, anu.thumbnail, args[0])
		} catch (e) {
			console.log(e)
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${apilol}&url=${args[0]}`)
				let anu = await res.json()
				anu = anu.result
				let vsize = anu.size.slice(-2)
				if (vsize == "GB") return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.size}`)
				if (!somematch(['kB','KB'], vsize) && parseInt(anu.size.replace(" MB", "")) > 400) return m.reply(`Filesize: ${anu.size}\nTidak dapat mengirim, maksimal file 400 MB`)
				if (!anu.link) throw new Error('Error')
				await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: anu.link }, mimetype: 'audio/mpeg', fileName: `${anu.title}.mp3` }, m, anu.title, anu.thumbnail, args[0])
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

