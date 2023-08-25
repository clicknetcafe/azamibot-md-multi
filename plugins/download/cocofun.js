let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `*Usage : ${usedPrefix + command} cocofun_url_video*\n\nExample :\n${usedPrefix + command} http://i.coco.fun/short/1513tui`
	if (!(text.includes('http://') || text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	try {
		let anu = await fetch(`https://api.lolhuman.xyz/api/cocofun?apikey=${api.lol}&url=${text}`)
		let json = await anu.json()
		let txt = `*${json.result.title}*\n\nuploader : *${json.result.uploader}*\ntag : ${json.result.tag}\nviews : ${json.result.views}`
		await conn.sendMsg(m.chat, { video: { url: json.result[/funwm/.test(command) ? 'withwm' : 'nowm'] }, caption: txt }, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply(`Invalid cocofun url.`)
	}
}

handler.menudownload = ['cocofun <url>','cocofunwm <url>']
handler.tagsdownload = ['search']
handler.command = /^(cocofun((no)?wm)?)$/i

handler.premium = true
handler.limit = true

export default handler