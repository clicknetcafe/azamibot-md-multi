import db from '../lib/database.js'

let handler = async (m, { conn, text }) => {
	let who = m.quoted ? m.quoted.sender : (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : text ? (text.replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
	if (!who) throw `tag atau ketik nomornya!`
	who = who.split('@')[0]
	let owners = db.data.datas.owner
	if (!owners.map(([number]) => number).map(v => v).includes(who)) return m.reply(`[ ! ] User tidak ada dalam list owner.`)
	db.data.datas.owner = owners.filter(([v]) => !v.includes(who))
	await conn.sendMessage(m.chat, { text: `Menghapus @${(who || '').replace(/@s\.whatsapp\.net/g, '')} dari list *owner*.`, mentions: [who + '@s.whatsapp.net'] }, { quoted: m })
}

handler.menuowner = ['delowner']
handler.tagsowner = ['ownerr']
handler.command = /^(del(ete)?owner)$/i

handler.rowner = true

export default handler

