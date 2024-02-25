import db from '../../lib/database.js'

let handler = async (m, { conn, text }) => {
	let who = text ? (text.replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : m.quoted ? m.quoted.sender : m.mentionedJid?.[0] ? m.mentionedJid[0] : ''
	if (!who) throw `tag atau ketik nomornya!`
	who = who.split('@')[0]
	let owners = db.data.datas.owner
	if (!owners.map(([number]) => number).map(v => v).includes(who)) return m.reply(`[ ! ] User tidak ada dalam list owner.`)
	db.data.datas.owner = owners.filter(([v]) => !v.includes(who))
	await conn.reply(m.chat, `Menghapus @${who} dari list *owner*.`, m, { mentions: [who + '@s.whatsapp.net'] })
}

handler.menuowner = ['delowner']
handler.tagsowner = ['ownerr']
handler.command = /^(del(ete)?owner)$/i

handler.rowner = true

export default handler

