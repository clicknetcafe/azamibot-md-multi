import { Primbon } from '../../lib/scrape.js'

const primbon = new Primbon()

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Usage : ${usedPrefix + command} tgl|bln|thn\n\nExample: *${usedPrefix + command} 20|06|2022*`
	let [l, r, s] = text.split`|`
	if (!l || isNaN(l)) throw `Input tanggal`
	if (!r || isNaN(r)) throw `Input bulan`
	if (!s || isNaN(s)) throw `Input tahun`
	try {
		let anu = await primbon.tanggal_jadian_pernikahan(l, r, s)
		if (!anu.status) throw new e()
		await m.reply(`*Tanggal :* ${anu.message.tanggal}\n\n*Karakteristik :*\n${anu.message.karakteristik}`)
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan, coba lagi nanti.`)
	}
}

handler.help = ['jadian <tgl>|<bln>|<thn>']
handler.tags = ['primbon']
handler.command = /^(jadian)$/i

handler.premium = true
handler.limit = true

export default handler