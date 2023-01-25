import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	try {
		let res = await fetch(`https://api.lolhuman.xyz/api/turnbackhoax?apikey=${apilol}`)
		let json = await res.json()
		let get_result = json.result
		if (get_result.length == 0) throw Error(`Informasi tidak tersedia.`)
		let ini_txt = '*Info Hoax :*'
		for (var x of get_result) {
			ini_txt += `\n\nTitle : *${x.title}*\n`
			ini_txt += `Link : ${x.link}\n`
			ini_txt += `Posted : ${x.posted}\n`
			ini_txt += `Description : ${x.desc}\n`
			ini_txt += `───────────────────`
		}
		await m.reply(ini_txt)
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