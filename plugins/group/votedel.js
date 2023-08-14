let handler = async (m, { conn, usedPrefix }) => {
	let id = m.chat
	conn.vote = conn.vote ? conn.vote : {}
	if (!(id in conn.vote)) return m.reply(`_*tidak ada voting digrup ini!*_\n\n*${usedPrefix}vote* - untuk memulai vote`)
	delete conn.vote[id]
	m.reply(`Berhasil Menghapus Sesi Vote Di Grup Ini`)

}

handler.menugroup = ['hapusvote']
handler.tagsgroup = ['group']
handler.command = /^((del(ete)?|hapus)vote)$/i

handler.group = true
handler.admin = true

export default handler 