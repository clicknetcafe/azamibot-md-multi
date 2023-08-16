import { chord } from '../../lib/scrape.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example : ${usedPrefix + command} melukis senja`
	try {
		let anu = await chord(text)
		if (!anu.status) throw Error()
		m.reply(anu.chord)
	} catch (e) {
		console.log(e)
		m.reply(`Chord tidak ditemukan.`)
	}
}

handler.help = ['chord <teks>']
handler.tags = ['information']
handler.command = /^(chord)$/i

handler.premium = true
handler.limit = true

export default handler