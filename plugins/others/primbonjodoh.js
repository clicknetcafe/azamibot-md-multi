import { Primbon } from '../../lib/scrape.js'

const primbon = new Primbon()

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Usage : ${usedPrefix + command} name1|name2\n\nExample: *${usedPrefix + command} Tahu|Bacem*`
	let [l, r] = text.split`|`
	if (!l) throw `Input nama1`
	if (!r) throw `Input nama2`
	try {
		let anu = await primbon.kecocokan_nama_pasangan(l, r)
		if (!anu.status) throw new e()
		await m.reply(`*nama_anda :* ${anu.message.nama_anda}\n*nama_pasangan :* ${anu.message.nama_pasangan}\n\n*Sisi Positif :*\n${anu.message.sisi_positif}\n\n*Sisi Negatif :*\n${anu.message.sisi_negatif}`)
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan, coba lagi nanti.`)
	}
}

handler.help = ['jodoh <nama1>|<nama2>']
handler.tags = ['primbon']
handler.command = /^(jodoh)$/i

handler.premium = true
handler.limit = true

export default handler