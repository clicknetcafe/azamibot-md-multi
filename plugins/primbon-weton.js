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
		let anu = await primbon.rejeki_hoki_weton(l, r, s)
		let anu2 = await primbon.pekerjaan_weton_lahir(l, r, s)
		let anu3 = await primbon.sifat_usaha_bisnis(l, r, s)
		if (!anu.status) throw new e()
		await m.reply(`*Hari Lahir :* ${anu.message.hari_lahir}\n\n*Rejeki :*\n${anu.message.rejeki}\n*Pekerjaan :*\n${anu2.message.pekerjaan}\n*Sifat Usaha Bisnis :*\n${anu3.message.usaha}`)
	} catch (e) {
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/weton/${l}/${r}/${s}?apikey=${apilol}`)
			let json = await res.json()
			if (json.status != '200') throw new e()
			let get_result = json.result
			let ini_txt = `*${get_result.weton}*\n\n`
			ini_txt += `*Pekerjaan :* ${get_result.pekerjaan}\n\n`
			ini_txt += `*Rejeki :* ${get_result.rejeki}\n\n`
			ini_txt += `*Jodoh :* ${get_result.jodoh}`
			m.reply(ini_txt)
		} catch (e) {
			m.reply(`Terjadi kesalahan, coba lagi nanti.`)
		}
	}
}

handler.help = ['weton <tgl>|<bln>|<thn>']
handler.tags = ['primbon']
handler.command = /^(weton)$/i

handler.premium = true
handler.limit = true

export default handler