import { cSize } from '../../lib/func.js'
import { ytdl, ytdl2 } from '../../lib/scrape.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!(args[0] || '').match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	await conn.sendMsg(m.chat, { react: { text: '⌛', key: m.key } })
	try {
		let res = await ytdl(args[0])
		let anu = {};
		res.resultUrl.video.forEach(v => {
			anu[v.quality] = v;
		});
		let url = anu['360p'] ?? anu['480p'] ?? anu['240p']
		if (url) throw Error('no media')
		if (!cSize(url.size)) return m.reply(`Filesize: ${url.size}\nBatas maksimum download: 450 MB`)
		let txt = `*${res.result.title}*\n\n`
		txt += `⭔ Watch : ${args[0]}\n`
		txt += `⭔ Size: ${url.size} (${url.quality})`
		await conn.sendFile(m.chat, await url.download(), '', txt, m)
	} catch (e) {
		console.log(e)
		try {
			/*let anu = await ytdl2(args[0]);
			if (!anu.status) throw Error(anu.msg)
			anu = anu.data
			let txt = `*${anu.title}*\n\n⭔ Watch : ${args[0]}`
			await conn.sendFile(m.chat, anu.video, anu.title+'.mp4', txt, m)*/
			let anu = await (await fetch('https://api.siputzx.my.id/api/d/ytmp4?url='+args[0])).json()
			if (!anu.error) {
				anu = anu.data
				let txt = `*${anu.title}*\n\n⭔ Watch : ${args[0]}`
				await conn.sendFile(m.chat, anu.dl, anu.title+'.mp4', txt, m)
			} else m.reply(anu.error)
		} catch (e) {
			console.log(e)
			m.reply(e.message)
		}
	}
}

handler.menudownload = ['ytvideo <url>']
handler.tagsdownload = ['search']
handler.command = /^(yt(v(ideo)?|mp4))$/i

handler.premium = true
handler.limit = true

export default handler