import db from '../lib/database.js'

const cooldown = 86400000

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Format : ${usedPrefix + command} <day> <@tag/quote>\n1 = 1 hari\n5 = 5 hari ... dst.\n\nContoh : *${usedPrefix + command} 10 @Alan*`
	if (isNaN(args[0])) return m.reply(`[!] Durasi harus dalam format angka.`)
	let who
	if (m.isGroup) who = args[1] ? args[1] : m.quoted ? m.quoted.sender : m.mentionedJid ? m.mentionedJid[0] : ''
	else who = m.quoted ? m.quoted.sender : m.chat ? m.chat : ''
	if (!who) return m.reply(`Input nomor / @tag orangnya!`)
	let user = db.data.users
	let prems = db.data.datas.prems
	who = who.replace(/\D/g,'') + '@s.whatsapp.net'
	if (!user[who]) return m.reply(`[!] User tidak ada dalam database.`)
	if (prems.map(v => v.user).includes(who)) return m.reply(`*[ ! ] Dia sudah Premium.*`)
	let durasi = parseInt(args[0])
	prems.push({user: who, date: new Date() * 1 + durasi * cooldown})
	user[who].expired = +new Date() + durasi * cooldown
	await conn.sendMessage(m.chat, { text: `@${who.split('@')[0]} Menjadi User Premium.\n\n*Durasi : ${durasi} hari*`, mentions: [who] }, { quoted: m })
}

handler.mengroup = ['addprem <day> <@tag>']
handler.tagsowner = ['owner']
handler.command = /^(addprem(ium)?)$/i

handler.owner = true

export default handler