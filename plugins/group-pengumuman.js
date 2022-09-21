import { generateWAMessageFromContent } from '@adiwajshing/baileys'

let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	text = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.quoted && m.quoted.caption ? m.quoted.caption : m.quoted && m.quoted.description ? m.quoted.description : ''
	if (!text) throw `Example : ${usedPrefix + command} ayo mabar`
	if (text.includes('chat.whatsapp.com')) throw `Maaf, tidak boleh send link group`
	if (/video/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(m.chat, { video: media, caption: text, mentions: participants.map(a => a.id) }, { quoted: fkontak })
	} else if (/image/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(m.chat, { image: media, caption: text, mentions: participants.map(a => a.id) }, { quoted: fkontak })
	} else {
		conn.sendMessage(m.chat, { text: text, mentions: participants.map(a => a.id) }, { quoted: fkontak })
	}
}

handler.menugroup = ['hidetag'].map(v => v + ' <teks>')
handler.tagsgroup = ['group']
handler.command = /^(pengumuman|announce|hidd?en?tag)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler