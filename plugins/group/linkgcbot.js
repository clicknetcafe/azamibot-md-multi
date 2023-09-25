import db from '../../lib/database.js'

let handler = async (m, { conn, command }) => {
	await conn.reply(m.chat, `*[ LINK GRUP BOT ]*\n\n${db.data.datas.linkgc}` || '[ ! ] Link GC belum di set oleh Owner.', m)
}

handler.menugroup = ['linkgcbot']
handler.tagsgroup = ['group']
handler.command = /^((link)?(gc|gro?up)bot)$/i

export default handler