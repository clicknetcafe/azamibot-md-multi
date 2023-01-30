let handler = async (m, { conn }) => {
	if (m.quoted?.chat != 'status@broadcast') throw `Quote Pesan Status`
	try {
		let buffer = await m.quoted.download()
		await conn.sendFile(m.chat, buffer, '', m.quoted.text || '', null, false, { quoted: m })
	} catch (e) {
		console.log(e)
		await conn.sendMessage(m.chat, { text: m.quoted.text }, { quoted: m })
	}
}

handler.help = ['downloadsw']
handler.tags = ['tools']
handler.command = /^((sw|status)(dl|download)|(dl|download)(sw|status))$/i

export default handler