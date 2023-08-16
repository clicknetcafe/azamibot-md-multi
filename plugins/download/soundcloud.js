import { soundcloud } from '../../lib/scrape.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `*Usage : ${usedPrefix + command} url*\n\nExample: ${usedPrefix + command} https://soundcloud.com/issabella-marchelina/sisa-rasa-mahalini-official-audio?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing`
	if (!(text.includes('http://') || text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	try {
		let anu = await soundcloud(text)
		let txt = `*${anu.title}*\n\n`
		txt += `⭔ Duration : ${anu.duration}\n`
		txt += `⭔ Quality : *${anu.quality}*`
		if (anu.download != undefined) await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted : m })
		if (command.includes('mp3')) await conn.sendMsg(m.chat, { document: { url: anu.download }, mimetype: 'audio/mpeg', fileName: `${anu.title}.mp3` }, { quoted : m })
		else await conn.sendMsg(m.chat, { audio: { url: anu.download }, mimetype: 'audio/mp4' }, { quoted : m })
	} catch (e) {
		console.log(e)
		m.reply(`Invalid Soundcloud URL / terjadi kesalahan.`)
	}
}

handler.menudownload = ['soundcloud <url>']
handler.tagsdownload = ['search']
handler.command = /^(s(ound)?cloud(a(audio)?|mp3)?)$/i

handler.premium = true
handler.limit = true

export default handler