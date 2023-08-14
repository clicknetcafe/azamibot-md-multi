import db from '../../lib/database.js'

let handler = async (m, { conn, command, text }) => {
	if (!text) return m.reply(`[!] Masukkan Nama Packname.`)
	db.data.datas.packname = text
	m.reply(`Packname berhasil diset menjadi :\n*${text}*`)
}

handler.menuowner = ['setpackname']
handler.tagsowner = ['ownerr']
handler.command = /^(setpackname)$/i

handler.rowner = true

export default handler