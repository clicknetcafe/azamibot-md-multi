import db from '../lib/database.js'
import { Configuration, OpenAIApi } from 'openai'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `! masukkan detail teks, semakin detail akan semakin akurat.\n\n*Contoh :*\n${usedPrefix + command} a photo of a phone from the 20s`
	try {
		let data = db.data.datas
		if (data.openaikey.length == 0) throw `key belum diset.\nGunakan *${usedPrefix}setopenaikey your_keys*\n\n_Dapatkan key di https://beta.openai.com/account/api-keys_`
		let configuration = new Configuration({ apiKey: data.openaikey.getRandom() })
		let openai = new OpenAIApi(configuration)
		let anu = await openai.createImage({ prompt: text, n: 4, size: '512x512' })
		anu = anu.data
		if (!anu.created) throw Error()
		await conn.sendMsg(m.chat, { image: anu.data.getRandom(), caption: `Open AI Dall E :\n${text}` }, { quoted: m })
	} catch (e) {
		console.log(e)
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/dall-e?apikey=${apilol}&text=${encodeURIComponent(text)}`)
			let anu = Buffer.from(await res.arrayBuffer())
			if (Buffer.byteLength(anu) < 22000) throw Error(`[!] Error : Buffer not found.`)
			await conn.sendMsg(m.chat, { image: anu, caption: `Open AI Dall E :\n${text}` }, { quoted: m })
		} catch (e) {
			console.log(e)
			throw `Fitur Error.`
		}
	}
}

handler.help = ['aiimage']
handler.tags = ['creator']
handler.command = /^((open)?ai-?(img|imag(in)?e|gambar|foto|dalle))$/i

handler.premium = true
handler.limit = true

export default handler