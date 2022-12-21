import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `[!] Masukkan teks.`
	try {
		let anu = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=${global.api}&text=${encodeURIComponent(text)}`)
		let json = await anu.json()
		if (json.status != '200') throw `Fitur Error.`
		await m.reply(json.result)
	} catch (e) {
		console.log(e)
		throw `Fitur Error.`
	}
}

handler.help = ['ai']
handler.tags = ['entertainment']
handler.command = /^((open)?ai)$/i

handler.premium = true
handler.limit = true

export default handler