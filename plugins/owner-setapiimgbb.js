import db from '../lib/database.js'

let handler = async (m, { conn, command, text }) => {
	if (!text) return m.reply(`[!] Masukkan Apikey IMGBB.\n\nDapatkan di : https://api.imgbb.com/`)
	db.data.datas.imgbb = text
	m.reply(`APIKEY IMGBB berhasil diset :\n*${text}*`)
}

handler.menuowner = ['setimgbbapi']
handler.tagsowner = ['ownerr']
handler.command = /^(set(imgbb(api(key)?)?|(api(key)?)?imgbb))$/i

handler.rowner = true

export default handler