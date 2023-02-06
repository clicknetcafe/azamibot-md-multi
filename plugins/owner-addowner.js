import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	text = text.split('|')
	if (!text[1]) return m.reply(`Format : ${usedPrefix + command} nomor|nama`)
	let who = m.quoted ? m.quoted.sender : (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : text[0] ? (text[0].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
	if (!who) throw `tag atau ketik nomornya!`
	let meh = await conn.onWhatsApp(who)
	if (meh.length == 0) return m.reply(`[!] Failed, @${(who.split('@')[0] || '')} bukan pengguna WhatsApp.`, null, { mentions: [who] })
	who = meh[0].jid.split('@')[0]
	if (meh[0].jid == conn.user.jid) return m.reply(`[ ! ] Nomor Bot sudah otomatis menjadi owner.`)
	if (db.data.datas.owner.map(([number]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(meh[0].jid)) return m.reply('[ ! ] Dia sudah jadi owner.')
	if (db.data.datas.rowner.map(([number]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(meh[0].jid)) return m.reply('[ ! ] Dia sudah jadi real owner.')
	db.data.datas.owner.push([who, text[1], true])
	await conn.reply(m.chat, `Sukses menjadikan @${(who || '').replace(/@s\.whatsapp\.net/g, '')} sebagai *owner*.`, m, { mentions: [meh[0].jid] })
}

handler.menuowner = ['addowner']
handler.tagsowner = ['ownerr']
handler.command = /^(addowner)$/i

handler.rowner = true

export default handler

