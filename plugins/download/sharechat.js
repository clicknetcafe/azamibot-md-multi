let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text) return m.reply(`*Usage : ${usedPrefix + command} url*\n\nExample :\n${usedPrefix + command} https://sharechat.com/video/pDExqga`)
	if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url invalid, please input a valid url. Try with add http:// or https://`)
	if (!text.includes('sharechat.com')) return m.reply(`Invalid Sharechat URL.`)
	try {
		let anu = await (await fetch(`https://api.lolhuman.xyz/api/sharechat?apikey=${api.lol}&url=${text}`)).json()
		if (anu.status != 200) throw Error(anu.message)
		anu = anu.result
		await conn.sendMsg(m.chat, { video: { url: anu.link_dl }, caption: anu.title }, { quoted: m })
	} catch (e) {
		console.log(e)
		throw 'Internal server error.'
	}
}

handler.menudownload = ['sharechat <url>']
handler.tagsdownload = ['search']
handler.command = /^(sharechat(dl)?)$/i

handler.premium = true
handler.limit = true

export default handler