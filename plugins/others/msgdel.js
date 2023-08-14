import db from '../../lib/database.js'

let handler = async (m, { command, usedPrefix, text }) => {
	if (!text) throw `Gunakan *${usedPrefix}listmsg* untuk melihat daftar nya`
	let msgs = db.data.msgs
	if (!(text in msgs)) throw `'${text}' tidak terdaftar di daftar pesan`
	delete msgs[text]
	m.reply(`Berhasil menghapus pesan di daftar pesan dengan nama '${text}'`)
}

handler.menuowner = ['msg'].map(v => 'del' + v + ' <teks>')
handler.tagsowner = ['owner']
handler.command = /^(delmsg|msgdel)$/i

handler.owner = true

export default handler
