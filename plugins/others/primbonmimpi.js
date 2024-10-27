import { artimimpi } from '../../lib/scrape.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Ular`
	try {
		let anu = await artimimpi(text)
		if (anu.length != 0) {
			let txt = `*Arti mimpi : ${text}*\n\n`
			for (var x of anu) {
				txt += `⭔ ${x}*\n\n`
			}
			m.reply(txt)
		} else {
			m.reply(`Tidak ditemukan tafsir mimpi *${text}*, cari dengan kata kunci yang lain.\nContoh : *${usedPrefix + command} ular*`)
		}
	} catch (e) {
		console.log(e)
		m.reply(`Fitur Error!`)
	}
}

handler.help = ['artimimpi <teks>']
handler.tags = ['primbon']
handler.command = /^((tafsir|arti)mimpi)$/i

handler.premium = true
handler.limit = true

export default handler