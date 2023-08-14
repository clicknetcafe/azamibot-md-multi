import { youtubedl } from '@bochilteam/scraper-sosmed'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	let za = command.includes('480') ? '480' : command.includes('720') ? '720' : '1080'
	try {
		let anu = await youtubedl(args[0])
		let list = Object.keys(anu.video).toString()
		let data = anu.video[`${za}p`]
		let url = await data.download()
		if (data.fileSize > 400000) return m.reply(`Filesize: ${data.fileSizeH}\nTidak dapat mengirim, maksimal file 400 MB`)
		let txt = `*${anu.title}*\n\n`
		txt += `⭔ Watch : ${args[0]}\n`
		txt += `⭔ Resolution : ${data.quality}\n`
		txt += `⭔ Size : ${data.fileSizeH}`
		//await conn.sendMsg(m.chat, { video: { url: url }, caption: txt }, { quoted: m })
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