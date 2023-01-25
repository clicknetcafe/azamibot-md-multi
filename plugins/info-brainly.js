import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Soekarno adalah`
	try {
		let res = await fetch(`https://api.lolhuman.xyz/api/brainly?apikey=${apilol}&query=${encodeURIComponent(text)}`)
		let json = await res.json()
		if (json.status != '200') throw `Informasi tidak tersedia.`
		let get_result = json.result
		let ini_txt = "*Result :*"
		for (var x of get_result) {
			ini_txt += `\n\n*Question :*\n${x.question.content}\n`
			ini_txt += `*Answer :*\n${x.answer[0].content}\n`
			ini_txt += `───────────────────`
		}
		await m.reply(ini_txt)
	} catch (e) {
		console.log(e)
		m.reply(`Informasi tidak tersedia.`)
	}
}

handler.help = ['brainly <teks>']
handler.tags = ['information']
handler.command = /^(brainly)$/i

handler.premium = true
handler.limit = true

export default handler