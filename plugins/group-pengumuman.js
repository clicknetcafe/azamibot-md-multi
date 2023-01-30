let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || q.mtype || ''
	text = text ? text : m.quoted?.text ? m.quoted.text : m.quoted?.caption ? m.quoted.caption : m.quoted?.description ? m.quoted.description : ''
	if (!text) throw `Example : ${usedPrefix + command} ayo mabar`
	if (text.includes('chat.whatsapp.com')) throw `Maaf, tidak boleh send link group`
	if (/video|image|viewOnce/g.test(mime) && !/webp/g.test(mime)) {
		let media = await q.download?.()
		await conn.sendFile(m.chat, media, '', text, null, false, { mentions: participants.map(a => a.id), quoted: fkontak })
	} else await conn.sendMessage(m.chat, { text: text, mentions: participants.map(a => a.id) }, { quoted: fkontak })
}

handler.menugroup = ['hidetag'].map(v => v + ' <teks>')
handler.tagsgroup = ['group']
handler.command = /^(pengumuman|announce|hidd?en?tag)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler