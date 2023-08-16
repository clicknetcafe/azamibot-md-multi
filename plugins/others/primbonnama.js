import { Primbon } from '../../lib/scrape.js'

const primbon = new Primbon()

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Andi`
	try {
		let anu = await primbon.arti_nama(text)
		if (!anu.status) throw new e()
		await m.reply(`*Nama :* ${anu.message.nama}\n*Arti :* ${anu.message.arti}`)
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan, coba lagi nanti.`)
	}
}

handler.help = ['artinama <teks>']
handler.tags = ['primbon']
handler.command = /^(artinama)$/i

handler.premium = true
handler.limit = true

export default handler