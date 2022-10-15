import fetch from 'node-fetch'
import { savefrom, youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   
function niceBytes(x) {
	let l = 0, n = parseInt(x, 10) || 0;
	while(n >= 1024 && ++l){
		n = n/1024;
	}
	return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	let fimg, fimgb
	try {
		const { thumbnail, video: _video, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
		let video, source, res, link, lastError
		video = _video[`720p`]
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
			let anu = await savefrom(`${text}`)
			var x = anu.url.findIndex(y => y.quality ==="720" && y.ext==="mp4")
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
			m.reply(`Invalid Youtube URL / terjadi kesalahan.`)
		}
	}
}

handler.menudownload = ['ytvideo720 <url>']
handler.tagsdownload = ['search']
handler.command = /^(yt(v(ideo)?|mp4)720p?)$/i

handler.premium = true
handler.limit = true

export default handler