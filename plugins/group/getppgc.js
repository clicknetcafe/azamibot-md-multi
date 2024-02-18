let handler = async(m, { conn }) => {
	try {
		let url = await conn.profilePictureUrl(m.chat, 'image')
		await conn.sendMsg(m.chat, { image: { url: url } }, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply(`Gagal mengambil pp grup.`)
	}
}

handler.menugroup = ['getppgc']
handler.tagsgroup = ['group']
handler.command = /^((getpp|ava)(gc|gro?up))$/i

handler.group = true

export default handler