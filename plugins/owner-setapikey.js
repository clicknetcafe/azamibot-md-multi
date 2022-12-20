import db from '../lib/database.js'

let handler = async (m, { conn, command, text }) => {
	if (!text) return m.reply(`[!] Masukkan Apikey Lolhuman.\n\nDapatkan di : https://api.lolhuman.xyz/pricing`)
	db.data.datas.api = text
	m.reply(`APIKEY LolHuman berhasil diset :\n*${text}*`)
}

handler.menuowner = ['setapikey']
handler.tagsowner = ['ownerr']
handler.command = /^(set(api(key)?(lol(human)?)?|(lol(human)?)?api(key)?))$/i

handler.rowner = true

export default handler