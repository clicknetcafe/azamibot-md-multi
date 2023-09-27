import db from '../../lib/database.js'

let handler = async (m, { conn, command, text }) => {
	if (!text) return m.reply(`[!] Masukkan Nama Group.`)
	db.data.datas.maingroupname = text
	m.reply(`Fakename Group berhasil diset menjadi :\n${text}`)
}

handler.menuowner = ['setgcnamebot']
handler.tagsowner = ['ownerr']
handler.command = /^(set((gc|gro?up)name|name(gc|gro?up))bot)$/i

handler.rowner = true

export default handler