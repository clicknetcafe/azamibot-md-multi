import db from '../../lib/database.js'

let handler = async (m, { conn, text }) => {
	let user = db.data.users[m.sender]
	user.afk = + new Date
	user.afkReason = text
	m.reply(`${await conn.getName(m.sender)} is now AFK${text ? `\n  *Alasan* : ${text}` : ''}`)
}

handler.menugroup = ['afk']
handler.tagsgroup = ['group']
handler.command = /^(afk)$/i

export default handler