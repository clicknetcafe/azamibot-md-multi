import { latinToAksara } from '@bochilteam/scraper'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Ubah Latin ke Aksara Jawa\n\nContoh :\n*${usedPrefix + command} halo rek*`
	let anu = await latinToAksara(`${text}`)
	m.reply(`*Hasil :*\n${anu}`)
}

handler.help = ['toaksara <teks>']
handler.tags = ['tools']
handler.command = /^((latin)?toaksara)$/i

export default handler