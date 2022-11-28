import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	text = text.split('|')
	if (!text[1]) return m.reply(`Format : ${usedPrefix + command} nomor|nama`)
	let who = m.quoted ? m.quoted.sender : (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : text[0] ? (text[0].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
	if (!who) throw `tag atau ketik nomornya!`
	let meh = await conn.onWhatsApp(who)
	who = meh[0].jid.split('@')[0]
	if (db.data.owner.map(([number]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(meh[0].jid)) return m.reply('[ ! ] Dia sudah jadi owner.')
	if (meh.length == 0) return m.reply(`[!] Failed, @${(who || '')} bukan pengguna WhatsApp.`, null, { mentions: [meh[0].jid] })
	db.data.owner.push([who, text[1], true])
	await conn.sendMessage(m.chat, { text: `Sukses menjadikan @${(who || '').replace(/@s\.whatsapp\.net/g, '')} sebagai *owner*.`, mentions: [meh[0].jid] }, { quoted: m })
}

handler.menugroup = ['addowner']
handler.tagsgroup = ['owner']
handler.command = /^(addowner)$/i

handler.rowner = true

export default handler

