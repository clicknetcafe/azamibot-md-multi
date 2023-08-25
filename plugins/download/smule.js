let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `*Usage : ${usedPrefix + command} smule_url_media*\n\nExample :\n${usedPrefix + command} https://www.smule.com/recording/lewis-capaldi-someone-you-loved/2027750707_2937753991`
	if (!(text.includes('http://') || text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	try {
		let anu = await (await fetch(`https://api.lolhuman.xyz/api/smule?apikey=${api.lol}&url=${text}`)).json()
		if (anu.status != 200) throw Error(anu.message)
		anu = anu.result
		if (/v/.test(command)) await conn.sendMsg(m.chat, { video: { url: anu.video }, caption: anu.title }, { quoted : m })
		else await conn.sendFile(m.chat, anu.audio, `${anu.title}.mp3`, '', m, false, /mp3/.test(command) ? { asDocument: true } : {})
	} catch (e) {
		console.log(e)
		throw 'invalid url / server down'
	}
}

handler.menudownload = ['smulemp3 <url>','smulevideo <url>']
handler.tagsdownload = ['search']
handler.command = /^(smule(v(ideo)?|mp3|a(udio)?)?)$/i

handler.premium = true
handler.limit = true

export default handler