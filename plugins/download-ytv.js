import fetch from 'node-fetch'
import { savefrom, youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'
import { niceBytes } from '../lib/others.js'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	let fimg, fimgb
	try {
		let anu = await savefrom(text)
		var x = anu.url.findIndex(y => y.quality ==='360' && y.ext==='mp4')
		if (x == -1) x = anu.medias.findIndex(y => y.quality ==='240' && y.ext==='mp4')
		if (x == -1) x == 0
		if (anu.url[x].filesize > 209715200) return m.reply(`Filesize: ${niceBytes(anu.url[x].filesize)}\nTidak dapat mengirim, maksimal file 200 MB`)
		fimg = await fetch(anu.url[x].url)
		fimgb = Buffer.from(await fimg.arrayBuffer())
		if (Buffer.byteLength(fimgb) < 22000) throw new e()
		let ini_txt = `*${anu.meta.title}*\n\n`
		ini_txt += `⭔ Watch : ${anu.meta.source}\n`
		ini_txt += `⭔ Resolution : ${anu.url[x].quality}p\n`
		ini_txt += `⭔ Size : ${niceBytes(anu.url[x].filesize)}`
		await conn.sendMessage(m.chat, { video: fimgb, caption: ini_txt }, { quoted: m })
	} catch (e) {
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/ytvideo?apikey=${global.api}&url=${text}`)
			if (!res.ok) throw new e()
			let anu = await res.json()
			anu = anu.result
			if (anu.link.size.slice(-2) == 'GB') return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.link.size}`)
			if (anu.link.size.slice(-2) != 'KB' && anu.link.size.slice(-2) != 'kB' && parseInt(anu.link.size) > 200) return m.reply(`Filesize: ${anu.link.size}\nTidak dapat mengirim, maksimal file 200 MB`)
			fimg = await fetch(anu.link.link)
			fimgb = Buffer.from(await fimg.arrayBuffer())
			if (Buffer.byteLength(fimgb) < 22000) throw new e()
			let ini_txt = `*${anu.title}*\n\n`
			ini_txt += `⭔ Watch : ${text}\n`
			ini_txt += `⭔ Resolution : ${anu.link.resolution}\n`
			ini_txt += `⭔ Size : ${anu.link.size}`
			await conn.sendMessage(m.chat, { video: fimgb, caption: ini_txt }, { quoted: m })
		} catch (e) {
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${global.api}&url=${text}`)
				if (!res.ok) throw new e()
				let anu = await res.json()
				anu = anu.result
				if (anu.size.slice(-2) == 'GB') return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.size}`)
				if (anu.size.slice(-2) != 'KB' && anu.size.slice(-2) != 'kB' && parseInt(anu.size) > 200) return m.reply(`Filesize: ${anu.size}\nTidak dapat mengirim, maksimal file 200 MB`)
				fimg = await fetch(anu.link)
				fimgb = Buffer.from(await fimg.arrayBuffer())
				if (Buffer.byteLength(fimgb) < 22000) throw new e()
				let ini_txt = `*${anu.title}*\n\n`
				ini_txt += `⭔ Watch : ${text}\n`
				ini_txt += `⭔ Size : ${anu.size}`
				await conn.sendMessage(m.chat, { video: fimgb, caption: ini_txt }, { quoted: m })
			} catch (e) {
				try {
					const xa = require('xfarr-api')
					let anu = await xa.downloader.youtube(text)
					if (anu.size.slice(-2) == 'GB') return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.size}`)
					if (anu.size.slice(-2) != 'KB' && anu.size.slice(-2) != 'kB' && parseInt(anu.size) > 200) return m.reply(`Filesize: ${anu.size}\nTidak dapat mengirim, maksimal file 200 MB`)
					fimg = await fetch(anu.download_url)
					fimgb = Buffer.from(await fimg.arrayBuffer())
					if (Buffer.byteLength(fimgb) < 22000) throw new e()
					let ini_txt = `*${anu.title}*\n\n`
					ini_txt += `⭔ Username : ${anu.username}\n`
					ini_txt += `⭔ Quality : ${anu.fquality}\n`
					ini_txt += `⭔ Size : ${anu.size}`
					await conn.sendMessage(m.chat, { video: fimgb, caption: ini_txt }, { quoted: m })
				} catch (e) {
					try {
						const { thumbnail, video: _video, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
						let video, source, res, link, lastError
						video = _video[`360p`]
						if (video.fileSize > 200000) return m.reply(`Filesize: ${video.fileSizeH}\nTidak dapat mengirim, maksimal file 200 MB`)
						link = await video.download()
						if (link) res = await fetch(link)
						if (res) source = await res.arrayBuffer()
						let ini_txt = `*${title}*\n\n`
						ini_txt += `⭔ Watch : ${text}\n`
						ini_txt += `⭔ Resolution : ${video.quality}\n`
						ini_txt += `⭔ Size : ${video.fileSizeH}`
						fimg = await fetch(link)
						fimgb = Buffer.from(await fimg.arrayBuffer())
						if (Buffer.byteLength(fimgb) < 22000) throw new e()
						await conn.sendMessage(m.chat, { video: fimgb, caption: ini_txt }, { quoted: m })
					} catch (e) {
						try {
							const { thumbnail, video: _video, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
							let video, source, res, link, lastError
							video = _video[`240p`]
							if (video.fileSize > 200000) return m.reply(`Filesize: ${video.fileSizeH}\nTidak dapat mengirim, maksimal file 200 MB`)
							link = await video.download()
							if (link) res = await fetch(link)
							if (res) source = await res.arrayBuffer()
							let ini_txt = `*${title}*\n\n`
							ini_txt += `⭔ Watch : ${text}\n`
							ini_txt += `⭔ Resolution : ${video.quality}\n`
							ini_txt += `⭔ Size : ${video.fileSizeH}`
							fimg = await fetch(link)
							fimgb = Buffer.from(await fimg.arrayBuffer())
							if (Buffer.byteLength(fimgb) < 22000) throw new e()
							await conn.sendMessage(m.chat, { video: fimgb, caption: ini_txt }, { quoted: m })
						} catch (e) {
							m.reply(`Invalid Youtube URL / terjadi kesalahan.`)
						}
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