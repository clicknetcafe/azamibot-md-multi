let handler = async (m, { conn, command }) => {
	try {
		let res = await fetch(`https://rest-api.akuari.my.id/asupan/${command}`)
		let fimg = await fetch(res.url)
		let fimgb = Buffer.from(await fimg.arrayBuffer())
		if (Buffer.byteLength(fimgb) < 100000) throw new Error()
		await conn.sendButton(m.chat, `_Random Story ${command.replace('story','')}_`, pauthor, fimgb, [[command, usedPrefix+command]], m)
	} catch (e) {
		console.log(e)
		m.reply(e.message || 'internal server error.')
	}
}

handler.menuanime = ['anime','buddha','islam','katahati','kristen','lucu','motivasi'].map(v => 'story'+v)
handler.tagsanime = ['randommp4']
handler.command = /^(story(anime|buddha|islam|katahati|kristen|lucu|motivasi))$/i

handler.premium = true
handler.limit = true

export default handler