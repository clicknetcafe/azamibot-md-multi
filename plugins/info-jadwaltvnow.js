import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	try {
		let res = await fetch(`https://api.lolhuman.xyz/api/jadwaltv/now?apikey=${apilol}`)
		let json = await res.json()
		let get_result = json.result
		let ini_txt = `*Jadwal TV Now :*`
		for (let x in get_result) {
			ini_txt += `\n\n${x.toUpperCase()}${get_result[x]}\n───────────────────`
		}
		m.reply(ini_txt)
	} catch (e) {
		console.log(e)
		m.reply(`Jadwal tidak tersedia.`)
	}
}

handler.help = ['jadwaltvnow']
handler.tags = ['information']
handler.command = /^(jadwaltvnow)$/i

handler.premium = true
handler.limit = true

export default handler