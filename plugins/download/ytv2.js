import { cSize } from '../../lib/func.js'
import { ytdl, ytdl2 } from '../../lib/scrape.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!(args[0] || '').match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	let za = /360/.test(command) ? '360' : /480/.test(command) ? '480' : command.includes('720') ? '720' : '1080'
	await conn.sendMsg(m.chat, { react: { text: '⌛', key: m.key } })
	try {
		let za = /360/.test(command) ? '360' : /480/.test(command) ? '480' : command.includes('720') ? '720' : '1080'
		const anu = await ytdl2.video(args[0], za);
		if (!anu.status) throw Error(anu.msg)
		let txt = `*${anu.title}*\n\n⭔ Watch : ${args[0]}`
		await conn.sendFile(m.chat, anu.media, anu.title+'.mp4', txt, m)
	} catch (e) {
		console.log(e)
		try {
			let res = await ytdl(args[0])
			let anu = {};
			res.resultUrl.video.forEach(v => {
				anu[v.quality] = v;
			});
			let za = /360/.test(command) ? '360p' : /480/.test(command) ? '480p' : command.includes('720') ? '720p' : '1080p'
			let url = anu[za]
			if (!url) throw Error(za+` tidak tersedia`)
			if (!cSize(url.size)) return m.reply(`Filesize: ${url.size}\nBatas maksimum download: 450 MB`)
			let txt = `*${res.result.title}*\n\n`
				+ `⭔ Watch : ${args[0]}\n`
				+ `⭔ Size: ${url.size} (${url.quality})`
			await conn.sendFile(m.chat, await url.download(), '', txt, m)
		} catch (e) {
			console.log(e)
			m.reply(e.message)
		}
	}
}

handler.menudownload = ['360','480','720','1080'].map(v => 'ytvideo'+v+' <url>')
handler.tagsdownload = ['search']
handler.command = /^(yt(v(ideo)?|mp4)(360|480|720|1080)p?)$/i

handler.premium = true
handler.limit = true

export default handler