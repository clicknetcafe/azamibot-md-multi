let handler = async(m) => {
	try {
		let url = await conn.profilePictureUrl(m.chat, 'image')
		await conn.sendMessage(m.chat, { image: { url: url } }, { quoted: m })
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