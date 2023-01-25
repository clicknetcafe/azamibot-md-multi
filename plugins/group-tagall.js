let handler = async (m, { conn, text, participants }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	let teks = `⋙ *Pesan dari Admin Group* ⋘ \n\n${text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.quoted && m.quoted.caption ? m.quoted.caption : m.quoted && m.quoted.description ? m.quoted.description : 'Nothing'}\n\n`
	teks += `┌─\n`
	for (let mem of participants) {
		teks += `│◦❒ @${mem.id.split('@')[0]}\n`
	}
	teks += `└────`
	if (/video/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(m.chat, { video: media, caption: teks, mentions: participants.map(a => a.id) }, { quoted: fkontak })
	} else if (/image/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(m.chat, { image: media, caption: teks, mentions: participants.map(a => a.id) }, { quoted: fkontak })
	} else {
		conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: fkontak })
	}
}

handler.menugroup = ['tagall']
handler.tagsgroup = ['group']
handler.command = /^(tagall)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler