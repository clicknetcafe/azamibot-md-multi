import { youtubeSearch, youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Sia Unstopable`
	if (text.includes('http://') || text.includes('https://')) {
		if (!text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
		try {
			let anu = await youtubeSearch(`${text}`)
			let ini_txt = `📌 *${anu.video[0].title}*\n\n`
			ini_txt += `🪶 *Author :* ${anu.video[0].authorName}\n`
			ini_txt += `⏲️ *Published :* ${anu.video[0].publishedTime}\n`
			ini_txt += `⌚ *Duration :* ${anu.video[0].durationH}\n`
			ini_txt += `👁️ *Views :* ${anu.video[0].viewH}\n`
			ini_txt += `🌀 *Url :* ${anu.video[0].url}`
			conn.sendButton(m.chat, ini_txt, packname + ' - ' + author, anu.video[0].thumbnail.split("?")[0], [
				[`🎧 Audio`, `${usedPrefix}yta ${anu.video[0].url}`],
				[`🎥 Video`, `${usedPrefix}ytv ${anu.video[0].url}`]
			], m)
		} catch (e) {
			console.log(e)
			try {
				let anu = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
				let ini_txt = `📌 *${anu.title}*\n\n`
				ini_txt += `👁️ *id :* ${anu.id}\n`
				ini_txt += `⌚ *v_id :* ${anu.v_id}\n`
				ini_txt += `🌀 *Url :* ${args[0]}`
				conn.sendButton(m.chat, ini_txt, packname + ' - ' + author, anu.thumbnail, [
					[`🎧 Audio`, `${usedPrefix}yta ${args[0]}`],
					[`🎥 Video`, `${usedPrefix}ytv ${args[0]}`]
				], m)
			} catch (e) {
				console.log(e)
				try {
					let anu2 = await fetch(`https://api.lolhuman.xyz/api/ytvideo?apikey=${global.api}&url=${text}`)
					let anu = await anu2.json()
					let ini_txt = `📌 *${anu.result.title}*\n\n`
					ini_txt += `🪶 *Author :* ${anu.result.uploader}\n`
					ini_txt += `⌚ *Duration :* ${anu.result.duration}\n`
					ini_txt += `👁️ *Views :* ${anu.result.view}\n`
					ini_txt += `🌀 *Url :* https://youtu.be/${anu.result.id}`
					conn.sendButton(m.chat, ini_txt, packname + ' - ' + author, anu.result.thumbnail, [
						[`🎧 Audio`, `${usedPrefix}yta https://youtu.be/${anu.result.id}`],
						[`🎥 Video`, `${usedPrefix}ytv https://youtu.be/${anu.result.id}`]
					], m)
				} catch (e) {
					console.log(e)
					try {
						let anu2 = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${global.api}&url=${text}`)
						let anu = await anu2.json()
						let ini_txt = `📌 *${anu.result.title}*\n`
						conn.sendButton(m.chat, ini_txt, packname + ' - ' + author, anu.result.thumbnail, [
							[`🎧 Audio`, `${usedPrefix}yta https://youtu.be/${anu.result.thumbnail.split('/')[4]}`],
							[`🎥 Video`, `${usedPrefix}ytv https://youtu.be/${anu.result.thumbnail.split('/')[4]}`]
						], m)
					} catch (e) {
						console.log(e)
						try {
							const xa = require('xfarr-api')
							let anu = await xa.downloader.youtube(`${text}`)
							let ini_txt = `📌 *${anu.title}*\n\n`
							ini_txt += `🪶 *Author :* ${anu.author}\n`
							ini_txt += `👁️ *Username :* ${anu.username}\n`
							ini_txt += `🌀 *Url :* https://youtu.be/${anu.thumbnail.split('/')[4]}`
							conn.sendButton(m.chat, ini_txt, packname + ' - ' + author, anu.thumbnail, [
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
		let p = Math.random()
		try {
			let anu = await youtubeSearch(`${text}`)
			if (p <= 0.5) {
				let array = [];
				anu.video.forEach(function(i) {
					array.push({
						title: `🎯 ${i.title}`,
						rowId: usedPrefix + `yts ${i.url}`,
						description: `╰─ ♢ ${i.authorName} | ⏰ ${i.durationH}`
					});
				});
				const sections = [
					{
						title: `━ ━ ━ ━ 『 Youtube Search 』 ━ ━ ━ ━`,
						rows: array
					}
				]
				const listMessage = {
					text: `━ ━ 『 *YOUTUBE SEARCH* 』 ━ ━\n\n*Request From :* ${conn.getName(m.sender)}\n\n*Result :* ${text}`,
					footer: packname + ' - ' + author,
					//title: `⎔───「 ${packname} 」───⎔`,
					buttonText: `List Result 🎫`,
					sections
				}
				await conn.sendMessage(m.chat, listMessage, { quoted : m })
			} else {
				let ini_txt = `*Hasil : ${text}*`
				for (let i of anu.video) {
					ini_txt += `\n\n🎯 *${i.title}*\n`
					ini_txt += `🪶 Author : ${i.authorName}\n`
					ini_txt += `⏰ Duration : ${i.durationH}\n`
					if (i.publishedTime == undefined) {
						ini_txt += `🚀 Uploaded : ${i.publishedTime}\n`
					} else {
						if (i.publishedTime.split(" ")[0] != 'Streamed') {
							ini_txt += `🚀 Uploaded ${i.publishedTime}\n`
						} else {
							ini_txt += `🚀 ${i.publishedTime}\n`
						}
					}
					ini_txt += `😎 View : ${i.viewH}\n`
					ini_txt += `🌀 Url : ${i.url}\n`
					ini_txt += `───────────────────`
				}
				conn.sendFile(m.chat, anu.video[0].thumbnail.split("?")[0], 'yts.jpg', ini_txt, m)
			}
		} catch (e) {
			console.log(e)
			try {
				let anu2 = await fetch(`https://api.lolhuman.xyz/api/ytsearch?apikey=${global.api}&query=${encodeURIComponent(text)}`)
				let anu = await anu2.json()
				if (p <= 0.5) {
					let array = [];
					anu.result.forEach(function(i) {
						array.push({
							title: `🎯 ${i.title}`,
							rowId: usedPrefix + `yts https://youtu.be/${i.videoId}`,
							description: `╰─ ♢ ${i.published} | ${i.views} 🚀`
						});
					});
					const sections = [
						{
							title: `━ ━ ━ ━ 『 Youtube Search 』 ━ ━ ━ ━`,
							rows: array
						}
					]
					const listMessage = {
						text: `━ ━ 『 *YOUTUBE SEARCH* 』 ━ ━\n\n*Request From :* ${conn.getName(m.sender)}\n\n*Result :* ${text}`,
						footer: packname + ' - ' + author,
						//title: `⎔───「 ${packname} 」───⎔`,
						buttonText: `List Result 🎫`,
						sections
					}
					await conn.sendMessage(m.chat, listMessage, { quoted : m })
				} else {
					let ini_txt = `*Hasil : ${text}*`
					for (let i of anu.result) {
						ini_txt += `\n\n🎯 *${i.title}*\n`
						if (i.published == undefined) {
							ini_txt += `🚀 Uploaded : ${i.publishedTime}\n`
						} else {
							if (i.published.includes('Streamed')) {
								ini_txt += `🚀 ${i.published}\n`
							} else {
								ini_txt += `🚀 Uploaded ${i.published}\n`
							}
						}
						ini_txt += `😎 View : ${i.views}\n`
						ini_txt += `🌀 Url : https://youtu.be/${i.videoId}\n`
						ini_txt += `───────────────────`
					}
					conn.sendFile(m.chat, anu.result[0].thumbnail, 'yts.jpg', ini_txt, m)
				}
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