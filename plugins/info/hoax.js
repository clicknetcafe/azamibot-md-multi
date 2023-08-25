let handler = async (m, { conn, text, usedPrefix, command }) => {
	try {
		let res = await fetch(`https://api.lolhuman.xyz/api/turnbackhoax?apikey=${api.lol}`)
		let json = await res.json()
		let get_result = json.result
		if (get_result.length == 0) throw Error(`Informasi tidak tersedia.`)
		let txt = '*Info Hoax :*'
		for (var x of get_result) {
			txt += `\n\nTitle : *${x.title}*\n`
			txt += `Link : ${decodeURIComponent(x.link)}\n`
			txt += `Posted : ${x.posted}\n`
			txt += `Description : ${x.desc}\n`
			txt += `───────────────────`
		}
		await m.reply(txt)
	} catch (e) {
		console.log(e)
		m.reply(`Informasi tidak tersedia.`)
	}
}

handler.help = ['hoax']
handler.tags = ['information']
handler.command = /^((info)?hoax)$/i

handler.premium = true
handler.limit = true

export default handler