import db from '../../lib/database.js'

let handler = async (m, { conn, usedPrefix, text }) => {
	let user = db.data.users[m.sender]
	let txt = `[ *GUDANG BUAH KAMU* ]\n\n`
	txt += `🍌 ${user.pisang} Pisang\n`
	txt += `🍇 ${user.anggur} Anggur\n`
	txt += `🥭 ${user.mangga} Mangga\n`
	txt += `🍊 ${user.jeruk} Jeruk\n`
	txt += `🍎 ${user.apel} Apel\n\n`
	txt += `Gunakan command *${usedPrefix}sell* untuk menjual.`
	m.reply(txt)
}

handler.menufun = ['buah']
handler.tagsfun = ['rpg']
handler.command = /^((list)?(buah|fruits?))$/i

export default handler