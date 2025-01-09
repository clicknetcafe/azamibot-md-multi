let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	text = text ? text : m.quoted?.text ? m.quoted.text : m.quoted?.caption ? m.quoted.caption : m.quoted?.description ? m.quoted.description : ''
	if (!text) throw `Example : ${usedPrefix + command} ayo mabar`
	text = `@${m.chat}\n`+text
	let cox = { contextInfo: {
		mentionedJid: participants.map(a => a.id),
		groupMentions: [{
			groupJid: m.chat,
			groupSubject: 'everyone'
		}]
	}}
	if (/video|image/g.test(mime) && !/webp/g.test(mime))
		await conn.sendFile(m.chat, await q.download(), '', text, fkontak, false, cox)
	else await conn.reply(m.chat, text, fkontak, cox)
}

handler.menugroup = ['hidetag'].map(v => v + ' <teks>')
handler.tagsgroup = ['group']
handler.command = /^(pengumuman|announce|hidd?en?tag)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler