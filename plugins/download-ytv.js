import fetch from 'node-fetch'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'
import xa from 'xfarr-api'
import { niceBytes, isUrl, somematch } from '../lib/others.js'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	try {
		let { thumbnail, video: _video, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
		let video, source, res, link, lastError
		video = _video[`360p`]
		if (video.fileSize > 300000) return m.reply(`Filesize: ${video.fileSizeH}\nTidak dapat mengirim, maksimal file 300 MB`)
		link = await video.download()
		if (!isUrl(link)) throw Error('No link')
		if (link) res = await fetch(link)
		if (res) source = await res.arrayBuffer()
		let txt = `*${title}*\n\n`
		txt += `⭔ Watch : ${text}\n`
		txt += `⭔ Resolution : ${video.quality}\n`
		txt += `⭔ Size : ${video.fileSizeH}`
		await conn.sendMessage(m.chat, { video: { url: link }, caption: txt }, { quoted: m })
	} catch (e) {
		console.log(e)
		try {
			let anu = await xa.downloader.youtube(text)
			if (!isUrl(anu.download_url)) throw Error('No link')
			let vsize = anu.size.slice(-2)
			if (vsize == 'GB') return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.size}`)
			if (!somematch(['kB','KB'], vsize) && parseInt(anu.size) > 300) return m.reply(`Filesize: ${anu.size}\nTidak dapat mengirim, maksimal file 300 MB`)
			let txt = `*${anu.title}*\n\n`
			txt += `⭔ Username : ${anu.username}\n`
			txt += `⭔ Quality : ${anu.fquality}\n`
			txt += `⭔ Size : ${anu.size}`
			await conn.sendMessage(m.chat, { video: { url: anu.download_url }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/ytvideo?apikey=${apilol}&url=${text}`)
				let anu = await res.json()
				anu = anu.result
				if (!isUrl(anu.link.link)) throw Error('No link')
				let vsize = anu.link.size.slice(-2)
				if (vsize == 'GB') return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.link.size}`)
				if (!somematch(['kB','KB'], vsize) && parseInt(anu.link.size) > 300) return m.reply(`Filesize: ${anu.link.size}\nTidak dapat mengirim, maksimal file 300 MB`)
				let txt = `*${anu.title}*\n\n`
				txt += `⭔ Watch : ${text}\n`
				txt += `⭔ Resolution : ${anu.link.resolution}\n`
				txt += `⭔ Size : ${anu.link.size}`
				await conn.sendMessage(m.chat, { video: { url: anu.link.link }, caption: txt }, { quoted: m })
			} catch (e) {
				console.log(e)
				try {
					let res = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${apilol}&url=${text}`)
					let anu = await res.json()
					anu = anu.result
					let vsize = anu.size.slice(-2)
					if (vsize == 'GB') return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.size}`)
					if (!somematch(['kB','KB'], vsize) && parseInt(anu.size) > 300) return m.reply(`Filesize: ${anu.size}\nTidak dapat mengirim, maksimal file 300 MB`)
					let txt = `*${anu.title}*\n\n`
					txt += `⭔ Watch : ${text}\n`
					txt += `⭔ Size : ${anu.size}`
					await conn.sendMessage(m.chat, { video: { url: anu.link }, caption: txt }, { quoted: m })
				} catch (e) {
					console.log(e)
					try {
						let { thumbnail, video: _video, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
						let video, source, res, link, lastError
						video = _video[`240p`]
						if (video.fileSize > 300000) return m.reply(`Filesize: ${video.fileSizeH}\nTidak dapat mengirim, maksimal file 300 MB`)
						link = await video.download()
						if (!isUrl(link)) throw Error('No link')
						if (link) res = await fetch(link)
						if (res) source = await res.arrayBuffer()
						let txt = `*${title}*\n\n`
						txt += `⭔ Watch : ${text}\n`
						txt += `⭔ Resolution : ${video.quality}\n`
						txt += `⭔ Size : ${video.fileSizeH}`
						await conn.sendMessage(m.chat, { video: { url: link }, caption: txt }, { quoted: m })
					} catch (e) {
						console.log(e)
						m.reply(`Invalid Youtube URL / terjadi kesalahan.`)
					}
				}
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