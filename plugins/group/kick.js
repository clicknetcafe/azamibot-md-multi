import db from '../../lib/database.js'
import { sticker } from '../../lib/sticker.js'
import { somematch } from '../../lib/func.js'

let handler = async (m, { conn, text, participants }) => {
	if (db.data.settings[conn.user.jid].restrict) {
		try {
			let res = await fetch(`https://api.waifu.pics/sfw/kick`)
			let anu = await res.json()
			anu = anu.url
			if (!anu) throw Error('error : no url')
			let buffer = await sticker(false, anu, packname, author)
			await conn.sendFile(m.chat, buffer, '', '', m)
		} catch { throw `[ RESTRICT ENABLED ]` }
	} else {
		let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : text ? (text.replace(/\D/g, '') + '@s.whatsapp.net') : ''
		if (!who || who == m.sender) throw '*Quote / tag* target yang ingin di kick!!'
		if (participants.filter(v => v.id == who).length == 0) throw `Target tidak berada dalam Grup !`
		if (somematch([conn.user.jid, ...global.mods.map(v => v + '@s.whatsapp.net')], who)) throw 'Jangan gitu ama Owner'
		await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
	}
}

handler.menugroup = ['kick']
handler.tagsgroup = ['group']
handler.command = /^(kick|tendang)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler