import db from '../../lib/database.js'

const cooldown = 86400000

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Format : ${usedPrefix + command} <day> <@tag/quote>\n1 = 1 hari\n5 = 5 hari ... dst.\n\nContoh : *${usedPrefix + command} 10 @Alan*`
	if (isNaN(args[0])) return m.reply(`[!] Durasi harus dalam format angka.`)
	let who = args[1] ? (args[1].replace(/\D/g, '')+'@s.whatsapp.net') : m.quoted ? m.quoted.sender : m.mentionedJid ? m.mentionedJid[0] : ''
	if (!who) return m.reply(`Input nomor / @tag orangnya!`)
	let user = db.data.users
	let prems = db.data.datas.prems
	if (!user[who]) return m.reply(`[!] User tidak ada dalam database.`)
	if (prems.map(v => v.user).includes(who)) return m.reply(`*[ ! ] Dia sudah Premium.*`)
	let durasi = parseInt(args[0])
	prems.push({user: who, date: new Date() * 1 + durasi * cooldown})
	user[who].expired = +new Date() + durasi * cooldown
	await conn.reply(m.chat, `@${who.split('@')[0]} Menjadi User Premium.\n\n*Durasi : ${durasi} hari*`, m, { mentions: [who] })
}

handler.menuowner = ['addprem <day> <@tag>']
handler.tagsowner = ['owner']
handler.command = /^(addprem(ium)?)$/i

handler.rowner = true

export default handler