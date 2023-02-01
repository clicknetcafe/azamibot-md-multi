import { youtubeSearch, youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'
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
			await conn.sendButton(m.chat, txt, pauthor, anu.video[0].thumbnail.split("?")[0], [
				[`🎧 Audio`, `${usedPrefix}yta ${anu.video[0].url}`],
				[`🎥 Video`, `${usedPrefix}ytv ${anu.video[0].url}`]
			], m)
		} catch (e) {
			console.log(e)
			try {
				let anu = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
				let txt = `📌 *${anu.title}*\n\n`
				txt += `👁️ *id :* ${anu.id}\n`
				txt += `⌚ *v_id :* ${anu.v_id}\n`
				txt += `🌀 *Url :* ${args[0]}`
				await conn.sendButton(m.chat, txt, pauthor, anu.thumbnail, [
					[`🎧 Audio`, `${usedPrefix}yta ${args[0]}`],
					[`🎥 Video`, `${usedPrefix}ytv ${args[0]}`]
				], m)
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
					await conn.sendButton(m.chat, txt, pauthor, anu.thumbnail, [
						[`🎧 Audio`, `${usedPrefix}yta https://youtu.be/${anu.id}`],
						[`🎥 Video`, `${usedPrefix}ytv https://youtu.be/${anu.id}`]
					], m)
				} catch (e) {
					console.log(e)
					try {
						let res = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${apilol}&url=${text}`)
						let anu = await res.json()
						if (anu.status != '200') throw Error()
						anu = anu.result
						let txt = `📌 *${anu.title}*\n`
						await conn.sendButton(m.chat, txt, pauthor, anu.thumbnail, [
							[`🎧 Audio`, `${usedPrefix}yta https://youtu.be/${anu.thumbnail.split('/')[4]}`],
							[`🎥 Video`, `${usedPrefix}ytv https://youtu.be/${anu.thumbnail.split('/')[4]}`]
						], m)
					} catch (e) {
						console.log(e)
						try {
							let anu = await xa.downloader.youtube(text)
							let txt = `📌 *${anu.title}*\n\n`
							txt += `🪶 *Author :* ${anu.author}\n`
							txt += `👁️ *Username :* ${anu.username}\n`
							txt += `🌀 *Url :* https://youtu.be/${anu.thumbnail.split('/')[4]}`
							await conn.sendButton(m.chat, txt, pauthor, anu.thumbnail, [
								[`🎧 Audio`, `${usedPrefix}yta https://youtu.be/${anu.thumbnail.split('/')[4]}`],
								[`🎥 Video`, `${usedPrefix}ytv https://youtu.be/${anu.thumbnail.split('/')[4]}`]
							], m)
						} catch (e) {
							console.log(e)
							m.reply(`Tidak ditemukan hasil.`)
						}
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
			let txt = `📌 *${anu.video[x].title}*\n\n`
			txt += `🪶 *Author :* ${anu.video[x].authorName}\n`
			txt += `⏲️ *Published :* ${anu.video[x].publishedTime}\n`
			txt += `⌚ *Duration :* ${anu.video[x].durationH}\n`
			txt += `👁️ *Views :* ${anu.video[x].viewH}\n`
			txt += `🌀 *Url :* ${anu.video[x].url}`
			await conn.sendButton(m.chat, txt, pauthor, anu.video[x].thumbnail.split("?")[0], [
				[`🎧 Audio`, `${usedPrefix}yta ${anu.video[x].url}`],
				[`🎥 Video`, `${usedPrefix}ytv ${anu.video[x].url}`]
			], m)
		} catch (e) {
			console.log(e)
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/ytplay?apikey=${apilol}&query=${encodeURIComponent(text)}`)
				let anu = await res.json()
				if (anu.status != '200') throw Error()
				anu = anu.result
				let txt = `📌 *${anu.title}*\n\n`
				txt += `🪶 *Author :* ${anu.uploader}\n`
				txt += `⌚ *Duration :* ${anu.duration}\n`
				txt += `👁️ *Views :* ${anu.view}\n`
				txt += `🌀 *Url :* https://youtu.be/${anu.id}`
				await conn.sendButton(m.chat, txt, pauthor, anu.thumbnail, [
					[`🎧 Audio`, `${usedPrefix}yta https://youtu.be/${anu.id}`],
					[`🎥 Video`, `${usedPrefix}ytv https://youtu.be/${anu.id}`]
				], m)
			} catch (e) {
				console.log(e)
				try {
					let res = await fetch(`https://api.lolhuman.xyz/api/ytplay2?apikey=${apilol}&query=${encodeURIComponent(text)}`)
					let anu = await res.json()
					if (anu.status != '200') throw Error()
					anu = anu.result
					let txt = `📌 *${anu.title}*\n`
					await conn.sendButton(m.chat, txt, pauthor, anu.thumbnail, [
						[`🎧 Audio`, `${usedPrefix}yta https://youtu.be/${anu.thumbnail.split('/')[4]}`],
						[`🎥 Video`, `${usedPrefix}ytv https://youtu.be/${anu.thumbnail.split('/')[4]}`]
					], m)
				} catch (e) {
					console.log(e)
					m.reply(`Tidak ditemukan hasil.`)
				}
			}
		}
	}
}

handler.menudownload = ['ytplay <teks> / <url>']
handler.tagsdownload = ['search']
handler.command = /^(play|(play)?yt(play|dl)?)$/i

export default handler