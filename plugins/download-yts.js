import { youtubeSearch } from '@bochilteam/scraper-sosmed'
import fetch from 'node-fetch'
import xa from 'xfarr-api'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Sia Unstopable`
	if (text.includes('http://') || text.includes('https://')) {
		if (!text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
		try {
			let anu = await youtubeSearch(text)
			let txt = `📌 *${anu.video[0].title}*\n\n`
			txt += `🪶 *Author :* ${anu.video[0].authorName}\n`
			txt += `⏲️ *Published :* ${anu.video[0].publishedTime}\n`
			txt += `⌚ *Duration :* ${anu.video[0].durationH}\n`
			txt += `👁️ *Views :* ${anu.video[0].viewH}\n`
			txt += `🌀 *Url :* ${anu.video[0].url}`
			await conn.sendMsg(m.chat, { image: { url: anu.video[0].thumbnail.split("?")[0] }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			try {
				let anu2 = await fetch(`https://api.lolhuman.xyz/api/ytvideo?apikey=${apilol}&url=${text}`)
				let anu = await anu2.json()
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
					let anu2 = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${apilol}&url=${text}`)
					let anu = await anu2.json()
					anu = anu.result
					let txt = `📌 *${anu.title}*\n`
					txt += `🌀 *Url :* https://youtu.be/${anu.thumbnail.split('/')[4]}`
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
			let txt = `*Hasil : ${text}*`
			for (let i of anu.video) {
				txt += `\n\n🎯 *${i.title}*\n`
				txt += `🪶 Author : ${i.authorName}\n`
				txt += `⏰ Duration : ${i.durationH}\n`
				if (i.publishedTime == undefined) {
					txt += `🚀 Uploaded : ${i.publishedTime}\n`
				} else {
					if (i.publishedTime.split(" ")[0] != 'Streamed') {
						txt += `🚀 Uploaded ${i.publishedTime}\n`
					} else {
						txt += `🚀 ${i.publishedTime}\n`
					}
				}
				txt += `😎 View : ${i.viewH}\n`
				txt += `🌀 Url : ${i.url}\n`
				txt += `───────────────────`
			}
			await conn.sendMsg(m.chat, { image: { url: anu.video[0].thumbnail.split("?")[0] }, caption: txt }, { quoted : m })
		} catch (e) {
			console.log(e)
			try {
				let anu2 = await fetch(`https://api.lolhuman.xyz/api/ytsearch?apikey=${apilol}&query=${encodeURIComponent(text)}`)
				let anu = await anu2.json()
				let txt = `*Hasil : ${text}*`
				for (let i of anu.result) {
					txt += `\n\n🎯 *${i.title}*\n`
					if (i.published == undefined) {
						txt += `🚀 Uploaded : ${i.publishedTime}\n`
					} else {
						if (i.published.includes('Streamed')) {
							txt += `🚀 ${i.published}\n`
						} else {
							txt += `🚀 Uploaded ${i.published}\n`
						}
					}
					txt += `😎 View : ${i.views}\n`
					txt += `🌀 Url : https://youtu.be/${i.videoId}\n`
					txt += `───────────────────`
				}
				await conn.sendMsg(m.chat, { image: { url: anu.result[0].thumbnail }, caption: txt }, { quoted : m })
			} catch (e) {
				console.log(e)
				m.reply(`Tidak ditemukan hasil.`)
			}
		}
	}
}

handler.menudownload = ['ytsearch <teks> / <url>']
handler.tagsdownload = ['search']
handler.command = /^((search)?yt(s(earch)?)|youtube)$/i

export default handler