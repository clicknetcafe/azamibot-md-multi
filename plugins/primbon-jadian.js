import fetch from 'node-fetch'
import { Primbon } from 'scrape-primbon'

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
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/jadian/${l}/${r}/${s}?apikey=${apilol}`)
			let json = await res.json()
			if (json.status != '200') throw new e()
			let get_result = json.result
			let ini_txt = `*Karakteristik :* ${get_result.karakteristik}\n\n`
			ini_txt += `*Deskripsi :* ${get_result.deskripsi}`
			m.reply(ini_txt)
		} catch (e) {
			m.reply(`Terjadi kesalahan, coba lagi nanti.`)
		}
	}
}

handler.help = ['jadian <tgl>|<bln>|<thn>']
handler.tags = ['primbon']
handler.command = /^(jadian)$/i

handler.premium = true
handler.limit = true

export default handler