let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `*Usage : ${usedPrefix + command} smule_url_media*\n\nExample :\n${usedPrefix + command} https://sck.io/p/jiv-dwZX`
	if (!(text.includes('http://') || text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	try {
		let anu = await (await fetch(`https://api.lolhuman.xyz/api/snackvideo?apikey=${api.lol}&url=${text}`)).json()
		if (anu.status != 200) throw Error(anu.message)
		anu = anu.result
		await conn.sendMsg(m.chat, { video: { url: anu.url }, caption: anu.caption }, { quoted : m })
	} catch (e) {
		console.log(e)
		throw 'invalid url / server down'
	}
}

handler.menudownload = ['snackvideo <url>']
handler.tagsdownload = ['search']
handler.command = /^(snackvideo)$/i

handler.premium = true
handler.limit = true

export default handler