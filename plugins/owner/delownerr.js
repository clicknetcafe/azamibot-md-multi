import db from '../../lib/database.js'

let handler = async (m, { conn, text }) => {
	let who = text ? (text.replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : m.quoted ? m.quoted.sender : m.mentionedJid?.[0] ? m.mentionedJid[0] : ''
	if (!who) throw `tag atau ketik nomornya!`
	who = who.split('@')[0]
	let owners = db.data.datas.rowner
	if (!owners.map(([number]) => number).map(v => v).includes(who)) return m.reply(`[ ! ] User tidak ada dalam list real owner.`)
	db.data.datas.rowner = owners.filter(([v]) => !v.includes(who))
	await conn.reply(m.chat, `Menghapus @${who} dari list *real owner*.`, m, { mentions: [who + '@s.whatsapp.net'] })
}

handler.menuowner = ['delrealowner']
handler.tagsowner = ['ownerr']
handler.command = /^(del(ete)?r(eal)?owner)$/i

handler.rowner = true

export default handler

