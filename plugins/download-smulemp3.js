import fetch from 'node-fetch'

let handler = async(m, { conn, text, usedPrefix, command, apilol }) => {
	if (!text) throw `*Usage : ${usedPrefix + command} smule_url_media*\n\nExample :\n${usedPrefix + command} https://www.smule.com/recording/lewis-capaldi-someone-you-loved/2027750707_2937753991`
	if (!(text.includes('http://') || text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	try {
		let anu = await fetch(`https://api.lolhuman.xyz/api/smule?apikey=${apilol}&url=${text}`)
		let json = await anu.json()
		if (command.includes('mp3')) {
			await conn.sendMessage(m.chat, {document: { url: json.result.audio }, mimetype: 'audio/mpeg', fileName: `${json.result.title}.mp3`}, { quoted : m })
		} else {
			await conn.sendMessage(m.chat, { audio: { url: json.result.audio }, mimetype: 'audio/mp4' }, { quoted : m })
		}
	} catch (e) {
		console.log(e)
		m.reply(`Invalid Smule url.`)
	}
}

handler.menudownload = ['smuleaudio <url>']
handler.tagsdownload = ['search']
handler.command = /^(smule(mp3|a(udio)?))$/i

handler.premium = true
handler.limit = true

export default handler