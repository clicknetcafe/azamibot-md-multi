let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `*Usage : ${usedPrefix + command} likee_url_video*\n\nExample :\n${usedPrefix + command} https://likee.video/@vicky_marpaung/video/7006676628722311449`
	if (!(text.includes('http://') || text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	try {
		let anu = await fetch(`https://rest-api.akuari.my.id/downloader/likeedl?link=${text}`)
		let json = await anu.json()
		let txt = `${json.hasil.title}`
		await conn.sendMsg(m.chat, { video: { url: json.hasil.watermark }, caption: json.hasil.title }, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply(`Invalid likee url.`)
	}
}

handler.menudownload = ['likee <url>']
handler.tagsdownload = ['search']
handler.command = /^(likee(wm)?)$/i

handler.premium = true
handler.limit = true

export default handler