import { youtubeSearch } from '@bochilteam/scraper-sosmed'
import { isUrl } from '../../lib/func.js'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Sia Unstopable`
	if (isUrl(text)) {
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
			m.reply(`Invalid url / server down.`)
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
			m.reply(`Tidak ditemukan hasil.`)
		}
	}
}

handler.menudownload = ['ytsearch <teks> / <url>']
handler.tagsdownload = ['search']
handler.command = /^((search)?yt(s(earch)?)|youtube)$/i

export default handler