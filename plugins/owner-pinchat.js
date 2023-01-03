let handler = async (m, { conn, command }) => {
	command = command.toLowerCase()
	await conn.chatModify({ pin: command.includes('un') ? false : true }, m.chat)
	m.reply(`Chat berhasil di *${command.includes('un') ? 'unpin' : 'pin'}*.`)
}

handler.menuowner = ['pinchat','unpinchat']
handler.tagsowner = ['ownerr']
handler.command = /^((un)?pin(chats?)?)$/i

handler.rowner = true

export default handler