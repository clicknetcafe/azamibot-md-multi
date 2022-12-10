import db from '../lib/database.js'

let handler = async (m, { conn, text }) => {
	let who = m.quoted ? m.quoted.sender : (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : text ? (text.replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
	if (!who) throw `tag atau ketik nomornya!`
	who = who.split('@')[0]
	let owners = db.data.datas.rowner
	if (!owners.map(([number]) => number).map(v => v).includes(who)) return m.reply(`[ ! ] User tidak ada dalam list real owner.`)
	db.data.datas.rowner = owners.filter(([v]) => !v.includes(who))
	await conn.sendMessage(m.chat, { text: `Menghapus @${(who || '').replace(/@s\.whatsapp\.net/g, '')} dari list *real owner*.`, mentions: [who + '@s.whatsapp.net'] }, { quoted: m })
}

handler.menuowner = ['delrealowner']
handler.tagsowner = ['ownerr']
handler.command = /^(del(ete)?r(eal)?owner)$/i

handler.rowner = true

export default handler

