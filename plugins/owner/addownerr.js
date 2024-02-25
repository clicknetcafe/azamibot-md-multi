import db from '../../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	text = (text || '').split('|')
	let who = text[1] ? (text[1].replace(/\D/g, '') + '@s.whatsapp.net') : m.quoted ? m.quoted.sender : m.mentionedJid?.[0] ? m.mentionedJid[0] : ''
	if (!who) return m.reply(`Format : ${usedPrefix + command} nama | <tag / quote / ketik nmr nya>`)
	let meh = await conn.onWhatsApp(who)
	if (meh.length == 0) return m.reply(`[!] Failed, @${(who.split('@')[0] || '')} bukan pengguna WhatsApp.`, null, { mentions: [who] })
	if (who == conn.user.jid) return m.reply(`[ ! ] Nomor Bot sudah otomatis menjadi real owner.`)
	if (db.data.datas.owner.map(([number]) => number).includes(who.split('@')[0])) return m.reply('[ ! ] Dia sudah jadi owner.')
	if (db.data.datas.rowner.map(([number]) => number).includes(who.split('@')[0])) return m.reply('[ ! ] Dia sudah jadi real owner.')
	db.data.datas.rowner.push([who.split('@')[0], text[0], true])
	await conn.reply(m.chat, `Sukses menjadikan @${who.split('@')[0]} sebagai *real owner*.`, m, { mentions: [who] })
}

handler.menuowner = ['addrealowner']
handler.tagsowner = ['ownerr']
handler.command = /^(addr(eal)?owner)$/i

handler.rowner = true

export default handler