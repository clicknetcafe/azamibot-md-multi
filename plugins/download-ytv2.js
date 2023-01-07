import fetch from 'node-fetch'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'
import { niceBytes, isUrl } from '../lib/others.js'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	let za = command.includes('480') ? '480' : command.includes('720') ? '720' : '1080'
	try {
		const { thumbnail, video: _video, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
		let video, source, res, link, lastError
		video = _video[`${za}p`]
		if (video.fileSize > 300000) return m.reply(`Filesize: ${video.fileSizeH}\nTidak dapat mengirim, maksimal file 300 MB`)
		link = await video.download()
		if (link) res = await fetch(link)
		if (!isUrl(link)) throw Error('No link')
		if (res) source = await res.arrayBuffer()
		let txt = `*${title}*\n\n`
		txt += `⭔ Watch : ${text}\n`
		txt += `⭔ Resolution : ${video.quality}\n`
		txt += `⭔ Size : ${video.fileSizeH}`
		await conn.sendMessage(m.chat, { video: { url: link }, caption: txt }, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply(`[!] ${za}p tidak tersedia / terjadi kesalahan.`)
	}
}

handler.menudownload = ['480','720','1080'].map(v => 'ytvideo'+v+' <url>')
handler.tagsdownload = ['search']
handler.command = /^(yt(v(ideo)?|mp4)(480|720|1080)p?)$/i

handler.premium = true
handler.limit = true

export default handler