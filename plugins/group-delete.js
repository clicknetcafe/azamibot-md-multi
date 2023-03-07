import db from '../lib/database.js'

let handler = async (m, { conn, isOwner, isAdmin }) => {
	if (!m.quoted) throw false
	let { chat, fromMe } = m.quoted
	let charm = db.data.chats[m.chat]
	if (!fromMe && (isOwner || isAdmin)) {
		if ((!charm.nsfw && m.isGroup) || isOwner) await conn.sendMsg(chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender } })
		else throw 'Tidak dapat hapus pesan saat *nsfw* aktif!'
	} else {
		if ((!charm.nsfw && m.isGroup) || isOwner) await conn.sendMsg(chat, { delete: m.quoted.vM.key })
		else throw 'Tidak dapat hapus pesan saat *nsfw* aktif!'
	}
}

handler.menugroup = ['del', 'delete']
handler.tagsgroup = ['group']
handler.command = /^(d(el(ete)?)?)$/i

handler.group = true

export default handler