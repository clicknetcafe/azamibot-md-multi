import fetch from 'node-fetch'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'

let handler = async (m, { conn, text, args }) => {
	//if (!args || !args[0]) throw 'Uhm... urlnya mana?'
	if (!text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	const isY = /y(es)/gi.test(args[1])
	let fimg, fimgb
	try {
		const { audio: _audio, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
		let audio, source, res, link, lastError, sizeh
		for (let i in _audio) {
			try {
				audio = _audio[i]
				link = await audio.download()
				sizeh = await audio.fileSize
				if (link) res = await fetch(link)
				if (res) source = await res.arrayBuffer()
				if (source instanceof ArrayBuffer) break
			} catch (e) {
				audio = link = source = null
				lastError = e
			}
		}
		if (sizeh > 200000) throw `Filesize: ${audio.fileSizeH}\nTidak dapat mengirim, maksimal file 200 MB`
		fimg = await fetch(link)
		fimgb = Buffer.from(await fimg.arrayBuffer())
		if (Buffer.byteLength(fimgb) < 22000) throw new e()
		await conn.sendMessage(m.chat, {document: fimgb, mimetype: 'audio/mpeg', fileName: `${title}.mp3`}, { quoted : m })
	} catch (e) {
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/ytaudio?apikey=${global.api}&url=${text}`)
			let anu = await res.json()
			if (anu.result.link.size.slice(-2) == "GB") return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.result.link.size}`)
			if (anu.result.link.size.slice(-2) != "KB" && parseInt(anu.result.link.size.replace(" MB", "")) > 200) return m.reply(`Filesize: ${anu.result.link.size}\nTidak dapat mengirim, maksimal file 200 MB`)
			fimg = await fetch(anu.result.link.link)
			fimgb = Buffer.from(await fimg.arrayBuffer())
			if (Buffer.byteLength(fimgb) < 22000) throw new e()
			await conn.sendMessage(m.chat, {document: fimgb, mimetype: 'audio/mpeg', fileName: `${anu.result.title}.mp3`}, { quoted : m })
		} catch (e) {
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${global.api}&url=${text}`)
				let anu = await res.json()
				if (anu.result.size.slice(-2) == "GB") return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.result.size}`)
				if (anu.result.size.slice(-2) != "KB" && parseInt(anu.result.size.replace(" MB", "")) > 200) return m.reply(`Filesize: ${anu.result.size}\nTidak dapat mengirim, maksimal file 200 MB`)
				fimg = await fetch(anu.result.link)
				fimgb = Buffer.from(await fimg.arrayBuffer())
				if (Buffer.byteLength(fimgb) < 22000) throw new e()
				await conn.sendMessage(m.chat, {document: fimgb, mimetype: 'audio/mpeg', fileName: `${anu.result.title}.mp3`}, { quoted : m })
			} catch (e) {
				throw `Invalid Youtube URL / terjadi kesalahan.`
			}
		}
	}
}

handler.menudownload = ['ytaudio <url>']
handler.tagsdownload = ['search']
handler.command = /^yt(a(udio)?|mp3)$/i

handler.premium = true
handler.limit = true

export default handler

