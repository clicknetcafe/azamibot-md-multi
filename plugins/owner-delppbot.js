let handler = async (m, { conn }) => {
	await conn.removeProfilePicture(conn.user.jid)
	m.reply('Sukses menghapus PP Bot.')
}

handler.menuowner = ['delppbot']
handler.tagsowner = ['owner']
handler.command = /^(del(botpp|ppbot))$/i

handler.owner = true

export default handler