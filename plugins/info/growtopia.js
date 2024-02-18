let handler = async (m, { conn }) => {
	try {
		let anu = await (await fetch(`https://api.lolhuman.xyz/api/growtopia?apikey=${api.lol}`)).json()
		if (anu.status == 200) {
			anu = anu.result
			let txt = `*Player Online :* ${anu.player_online}`
			+ `\n\n*[WOTD]*`
			+ `\n*name :* ${anu.wotd.name}`
			+ `\n*preview :* ${anu.wotd.preview}`
			await conn.sendFile(m.chat, anu.wotd.preview.replace('www.growtopiagame.com/worlds', 's3.amazonaws.com/world.growtopiagame.com'), '', txt, m)
		} else m.reply(anu.message)
	} catch (e) {
		console.log(e)
		m.reply('internal server error.')
	}
}

handler.help = ['growtopia']
handler.tags = ['information']
handler.command = /^(growtopia)$/i

handler.limit = true

export default handler