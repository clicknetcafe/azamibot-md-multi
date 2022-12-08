import db from '../lib/database.js'

let handler = async (m, { conn, command, text }) => {
	if (!text) return m.reply(`[!] Masukkan Link Group.`)
	db.data.settings[conn.user.jid].linkgc = text
	m.reply(`Link Group berhasil diset menjadi :\n${text}`)
}

handler.mengroup = ['setlinkgc']
handler.tagsgroup = ['owner']
handler.command = /^(setlink(gro?up|gc))$/i

handler.ownerr = true

export default handler