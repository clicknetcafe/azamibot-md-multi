import { youtubeSearch, youtubedl } from '@bochilteam/scraper-sosmed'
import fetch from 'node-fetch'
import xa from 'xfarr-api'
import { somematch } from '../lib/others.js'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Sia Unstopable`
	let url = ''
	if (text.includes('http://') || text.includes('https://')) {
		if (!text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
		url = text
		try {
			let anu = await youtubeSearch(text)
			anu = anu.video[0]
			let txt = `📌 *${anu.title}*\n\n`
			txt += `🪶 *Author :* ${anu.authorName}\n`
			txt += `⏲️ *Published :* ${anu.publishedTime}\n`
			txt += `⌚ *Duration :* ${anu.durationH}\n`
			txt += `👁️ *Views :* ${anu.viewH}\n`
			txt += `🌀 *Url :* ${anu.url}`
			await conn.sendMsg(m.chat, { image: { url: anu.thumbnail.split("?")[0] }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/ytvideo?apikey=${apilol}&url=${text}`)
				let anu = await res.json()
				if (anu.status != '200') throw Error()
				anu = anu.result
				let txt = `📌 *${anu.title}*\n\n`
				txt += `🪶 *Author :* ${anu.uploader}\n`
				txt += `⌚ *Duration :* ${anu.duration}\n`
				txt += `👁️ *Views :* ${anu.view}\n`
				txt += `🌀 *Url :* https://youtu.be/${anu.id}`
				await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted: m })
			} catch (e) {
				console.log(e)
				try {
					let res = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${apilol}&url=${text}`)
					let anu = await res.json()
					if (anu.status != '200') throw Error()
					anu = anu.result
					let txt = `📌 *${anu.title}*\n`
					await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted: m })
				} catch (e) {
					console.log(e)
					try {
						let anu = await xa.downloader.youtube(text)
						let txt = `📌 *${anu.title}*\n\n`
						txt += `🪶 *Author :* ${anu.author}\n`
						txt += `👁️ *Username :* ${anu.username}\n`
						txt += `🌀 *Url :* https://youtu.be/${anu.thumbnail.split('/')[4]}`
						await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted: m })
					} catch (e) {
						console.log(e)
						m.reply(`Tidak ditemukan hasil.`)
					}
				}
			}
		}
	} else {
		try {
			let anu = await youtubeSearch(text)
			if (anu.video.length >= 4) {
				var x = Math.floor(Math.random() * 5)
			} else {
				var x = 0
			}
			anu = anu.video[x]
			url = anu.url
			let txt = `📌 *${anu.title}*\n\n`
			txt += `🪶 *Author :* ${anu.authorName}\n`
			txt += `⏲️ *Published :* ${anu.publishedTime}\n`
			txt += `⌚ *Duration :* ${anu.durationH}\n`
			txt += `👁️ *Views :* ${anu.viewH}\n`
			txt += `🌀 *Url :* ${url}`
			await conn.sendMsg(m.chat, { image: { url: anu.thumbnail.split("?")[0] }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/ytplay?apikey=${apilol}&query=${encodeURIComponent(text)}`)
				let anu = await res.json()
				if (anu.status != '200') throw Error()
				anu = anu.result
				url = `https://youtu.be/${anu.id}`
				let txt = `📌 *${anu.title}*\n\n`
				txt += `🪶 *Author :* ${anu.uploader}\n`
				txt += `⌚ *Duration :* ${anu.duration}\n`
				txt += `👁️ *Views :* ${anu.view}\n`
				txt += `🌀 *Url :* ${url}`
				await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted: m })
			} catch (e) {
				console.log(e)
				try {
					let res = await fetch(`https://api.lolhuman.xyz/api/ytplay2?apikey=${apilol}&query=${encodeURIComponent(text)}`)
					let anu = await res.json()
					if (anu.status != '200') throw Error()
					anu = anu.result
					url = `https://youtu.be/${anu.thumbnail.split('/')[4]}`
					let txt = `📌 *${anu.title}*\n`
					txt += `🌀 *Url :* ${url}`
					await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted: m })
				} catch (e) {
					console.log(e)
					m.reply(`Tidak ditemukan hasil.`)
				}
			}
		}
	}
	if (!url) return
	try {
		let res = await youtubedl(url)
		let data = res.audio[Object.keys(res.audio)[0]]
		let site = await data.download()
		if (data.fileSize > 400000) return m.reply(`Filesize: ${data.fileSizeH}\nTidak dapat mengirim, maksimal file 400 MB`)
		await conn.sendMsg(m.chat, { audio: { url: site }, mimetype: 'audio/mp4' }, { quoted : m })
	} catch {
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/ytaudio?apikey=${apilol}&url=${url}`)
			let anu = await res.json()
			anu = anu.result
			let vsize = anu.link.size.slice(-2)
			if (vsize == "GB") return
			if (!somematch(['kB','KB'], vsize) && parseInt(anu.link.size.replace(" MB", "")) > 400) return
			if (!anu.link.link) throw new Error('Error')
			await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: anu.link.link }, mimetype: 'audio/mpeg', fileName: `${anu.title}.mp3` }, m, anu.title, anu.thumbnail, args[0])
		} catch (e) {
			console.log(e)
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${apilol}&url=${url}`)
				let anu = await res.json()
				anu = anu.result
				let vsize = anu.size.slice(-2)
				if (vsize == "GB") return
				if (!somematch(['kB','KB'], vsize) && parseInt(anu.size.replace(" MB", "")) > 400) return
				if (!anu.link) throw new Error('Error')
				await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: anu.link }, mimetype: 'audio/mpeg', fileName: `${anu.title}.mp3` }, m, anu.title, anu.thumbnail, args[0])
			} catch (e) {
				console.log(e)
			}
		}
	} 
}

handler.menudownload = ['ytplay <teks> / <url>']
handler.tagsdownload = ['search']
handler.command = /^(play|(play)?yt(play|dl)?)$/i

export default handler