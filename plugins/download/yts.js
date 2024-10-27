import yts from 'yt-search'
import { youtubeSearch } from '../../lib/scrape.js'
import { isUrl } from '../../lib/func.js'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Sia Unstopable`
	await conn.sendMsg(m.chat, { react: { text: '🔍', key: m.key } })
	if (isUrl(text)) {
		try {
			let anu = await youtubeSearch(text)
			anu = anu.video[0]
			let txt = `📌 *${anu.title}*\n\n`
			+ `🪶 *Author :* ${anu.channelName}\n`
			+ `⏲️ *Published :* ${anu.publishedTime}\n`
			+ `⌚ *Duration :* ${anu.durationH}\n`
			+ `👁️ *Views :* ${anu.viewH}\n`
			+ `🌀 *Url :* ${anu.url}`
			await conn.sendMsg(m.chat, { image: { url: anu.thumbnail.split("?")[0] }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			try {
				let anu = await (await fetch(`https://rest-api.akuari.my.id/downloader/yt1?link=${args[0]}`)).json()
				let txt = `📌 *${anu.info.title}*\n\n`
				+ `🪶 *Author :* ${anu.info.channel}\n`
				+ `⏲️ *Published :* ${anu.info.uploadDate}\n`
				+ `👁️ *Views :* ${anu.info.views}\n`
				+ `🌀 *Url :* ${text}`
				await conn.sendMsg(m.chat, { image: { url: anu.info.thumbnail }, caption: txt }, { quoted: m })
			} catch (e) {
				console.log(e)
				throw 'invalid url / internal server error.'
			}
		}
	} else {
		try {
			let anu = await yts(text)
			let push = [];
			for (let i of anu.all.filter(v => v.url?.includes('watch?'))) {
				let info = `🪶 Author : ${i.author?.name}\n`
				+ `${(i.duration && i.duration.timestamp) ? `⏰ *Duration :* ${i.duration.timestamp}\n` : ''}`
				+ `🚀 Published : ${i.ago}\n`
				+ `😎 View : ${i.views}\n`
				+ `🌀 Url : ${i.url}\n`
				+ `───────────────────`
				push.push([info, 'yt-search', `🎯 *${i.title}*`, i.thumbnail, [['📽️ Video',`.ytv ${i.url}`,'cta_copy'],['🎧 Audio',`.yta ${i.url}`,'cta_copy']]])
			}
			await conn.sendSlide(m.chat, `*Hasil : ${text}*`, pauthor, push, m)
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
				throw 'not found / internal server error.'
			}
		}
	}
}

handler.menudownload = ['ytsearch <teks> / <url>']
handler.tagsdownload = ['search']
handler.command = /^((search)?yt(s(earch)?)|youtube)$/i

export default handler