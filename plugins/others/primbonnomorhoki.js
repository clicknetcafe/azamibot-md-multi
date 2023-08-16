import { Primbon } from '../../lib/scrape.js'

const primbon = new Primbon()

let handler = async (m, { conn, usedPrefix, text, command }) => {
	let teks = m.quoted ? m.quoted.sender.split('@')[0] : m.mentionedJid[0] ? m.mentionedJid[0].split('@')[0] : text ? `${isNaN(text) ? '' : text}` : ''
	if (!teks) throw `[!] Input nomor HP !\n\nformat nomor : 628xxxxxxxxxx`
	try {
		let anu = await primbon.nomer_hoki(teks)
		if (anu.status == false ) return m.reply(anu.message)
		let txt = `*Nomor HP : ${anu.message.nomer_hp}*\n\n`
		txt += `*angka_shuzi :* ${anu.message.angka_shuzi}\n\n`
		txt += `*Energi Positif :*\n*Kekayaan :* ${anu.message.energi_positif.kekayaan}\n`
		txt += `*Kesehatan :* ${anu.message.energi_positif.kesehatan}\n`
		txt += `*Cinta :* ${anu.message.energi_positif.cinta}\n`
		txt += `*Kestabilan :* ${anu.message.energi_positif.kestabilan}\n`
		txt += `*Persentase :* ${anu.message.energi_positif.persentase}\n\n`
		txt += `*Energi Negatif :*\n*Perselisihan :* ${anu.message.energi_negatif.perselisihan}\n`
		txt += `*Kehilangan :* ${anu.message.energi_negatif.kehilangan}\n`
		txt += `*Malapetaka :* ${anu.message.energi_negatif.malapetaka}\n`
		txt += `*Kehancuran :* ${anu.message.energi_negatif.kehancuran}\n`
		txt += `*Persentase :* ${anu.message.energi_negatif.persentase}\n\n`
		txt += `*Catatan :*\n${anu.message.catatan}`
		await m.reply(txt)
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan, coba lagi nanti.`)
	}
}

handler.help = ['nomorhoki']
handler.tags = ['primbon']
handler.command = /^(nom(o|e)rhoki)$/i

handler.premium = true
handler.limit = true

export default handler