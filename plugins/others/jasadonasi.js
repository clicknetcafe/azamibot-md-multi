import db from '../../lib/database.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	let p = db.data.datas.teksdonasi
	if (!p) throw `[ ! ] Belum di set oleh owner.\n\nCommand *${usedPrefix}setteksdonasi* untuk menambahkan teks ${command}`
	await m.reply(p)
}

handler.menugroup = ['donasi']
handler.tagsgroup = ['group']
handler.command = /^(dona(te|si))$/i

export default handler