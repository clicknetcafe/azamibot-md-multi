import fetch from 'node-fetch'
import { linkwa } from '../lib/others.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `[!] Mau nyari grup apa ?\n\nContoh:\n*${usedPrefix + command} mabar*`
	let anu = await linkwa(text)
	if (anu.length == 0) throw 'Group tidak ditemukan!'
	let teks = anu.map(v => v.nama + '\n' + '_' + v.link + '_').join('\n───────────────────\n')
	let image = 'https://telegra.ph/file/f5ec51bac808f543ef1d7.png'
	await conn.sendMessage(m.chat, { image: { url: image }, caption: teks }, { quoted: m })
}

handler.help = ['carigrup']
handler.tags = ['information']
handler.command = /^((cari|find)(link)?(gc|gro?up))$/i

handler.premium = true
handler.limit = true

export default handler