let handler = async(m) => {
	try {
		let url = await conn.profilePictureUrl(m.chat, 'image')
		await conn.sendFile(m.chat, url, '', null, m)
	} catch (e) {
		console.log(e)
		m.reply(`Gagal mengambil pp grup.`)
	}
}

handler.menugroup = ['getppgc']
handler.tagsgroup = ['group']
handler.command = /^(getpp(gc|gro?up))$/i

handler.group = true

export default handler