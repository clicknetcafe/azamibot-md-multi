import db from '../../lib/database.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	let p = db.data.datas.tekstopup
	if (!p) throw `[ ! ] Belum di set oleh owner.\n\nCommand *${usedPrefix}settekstopup* untuk menambahkan teks ${command}`
	await m.reply(p)
}

handler.menugroup = ['topup']
handler.tagsgroup = ['group']
handler.command = /^(topup)$/i

export default handler