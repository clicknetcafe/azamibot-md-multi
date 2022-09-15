let handler = async (m, { conn, text, participants }) => {
	let teks = `⋙ *Pesan dari Admin Group* ⋘ \n\n${text ? text : '*Nothing'}\n\n`
	teks += `┌─\n`
	for (let mem of participants) {
		teks += `│◦❒ @${mem.id.split('@')[0]}\n`
	}
	teks += `└────`
	conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) })
}

handler.menugroup = ['tagall']
handler.tagsgroup = ['group']
handler.command = /^(tagall)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler