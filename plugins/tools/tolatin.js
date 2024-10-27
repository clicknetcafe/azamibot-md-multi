import { aksaraToLatin } from '../../lib/scrape.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Ubah Aksara Jawa ke Latin\n\nContoh :\n*${usedPrefix + command} ꦲꦭ꧀ꦭꦺꦴ​ꦫꦺꦏ꧀*`
	try {
		let anu = await aksaraToLatin(text)
		m.reply(`*Hasil :*\n${anu}`)
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan, coba lagi nanti.`)
	}
}

handler.help = ['tolatin <teks>']
handler.tags = ['tools']
handler.command = /^((aksara)?tolatin)$/i

export default handler