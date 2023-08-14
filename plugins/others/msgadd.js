import db from '../../lib/database.js'
const { proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, command, usedPrefix, text }) => {
	let M = proto.WebMessageInfo
	if (!m.quoted) throw `Balas pesan dengan perintah *${usedPrefix + command}*`
	if (!text) throw `Pengunaan:${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} tes`
	let msgs = db.data.msgs
	if (text in msgs) throw `'${text}' telah terdaftar!`
	msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON()
	m.reply(`Berhasil menambahkan pesan '${text}'\n\nAkses dengan mengetik namanya`.trim())
}

handler.menuowner = ['msg'].map(v => 'add' + v + ' <teks>')
handler.tagsowner = ['owner']
handler.command = /^(addmsg|msgadd)$/i

handler.owner = true

export default handler
