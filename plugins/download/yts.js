import yts from 'yt-search'
import { youtubeSearch } from '@bochilteam/scraper-sosmed'
import { isUrl } from '../../lib/func.js'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Sia Unstopable`
	if (isUrl(text)) {
		try {
			let anu = await youtubeSearch(text)
			let txt = `📌 *${anu.video[0].title}*\n\n`
			+ `🪶 *Author :* ${anu.video[0].authorName}\n`
			+ `⏲️ *Published :* ${anu.video[0].publishedTime}\n`
			+ `⌚ *Duration :* ${anu.video[0].durationH}\n`
			+ `👁️ *Views :* ${anu.video[0].viewH}\n`
			+ `🌀 *Url :* ${anu.video[0].url}`
			await conn.sendMsg(m.chat, { image: { url: anu.video[0].thumbnail.split("?")[0] }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			m.reply(`Invalid url / server down.`)
		}
	} else {
		try {
			let anu = await yts(text)
			let txt = `*Hasil : ${text}*`
			for (let i of anu.all) {
				txt += `\n\n🎯 *${i.title}*\n`
				+ `🪶 Author : ${i.author.name}\n`
				+ `${(i.duration && i.duration.timestamp) ? `⏰ *Duration :* ${i.duration.timestamp}\n` : ''}`
				+ `🚀 Published : ${i.ago}\n`
				+ `😎 View : ${i.views}\n`
				+ `🌀 Url : ${i.url}\n`
				+ `───────────────────`
			}
			await conn.sendMsg(m.chat, { image: { url: anu.all[0].thumbnail }, caption: txt }, { quoted : m })
		} catch (e) {
			console.log(e)
			try {
				let anu = await youtubeSearch(text)
				let txt = `*Hasil : ${text}*`
				for (let i of anu.video) {
					txt += `\n\n🎯 *${i.title}*\n`
					+ `🪶 Author : ${i.authorName}\n`
					+ `⏰ Duration : ${i.durationH}\n`
					+ `${i.publishedTime ? `${i.publishedTime.split(" ")[0] != 'Streamed' ? `🚀 Uploaded ${i.publishedTime}\n` : `🚀 ${i.publishedTime}\n`}` : ''}`
					+ `😎 View : ${i.viewH}\n`
					+ `🌀 Url : ${i.url}\n`
					+ `───────────────────`
				}
				await conn.sendMsg(m.chat, { image: { url: anu.video[0].thumbnail.split("?")[0] }, caption: txt }, { quoted : m })
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