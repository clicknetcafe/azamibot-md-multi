import db from '../lib/database.js'

const cooldown = 86400000

let handler = async (m, { conn, args }) => {
	let who
	if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : args[0] ? args[0] : ''
	else who = m.quoted ? m.quoted.sender : m.chat ? m.chat : ''
	if (!who) return m.reply(`tag orangnya!`)
	let user = db.data.users
	let prems = db.data.datas.prems
	who = who.replace(/\D/g,'') + '@s.whatsapp.net'
	if (!user[who]) return m.reply(`[!] User tidak ada dalam database.`)
	if (prems.map(v => v.user).includes(who)) return m.reply(`*[ ! ] Dia sudah Premium.*`)
	if ((m.quoted && !args[0]) || (!m.quoted && !args[1] && m.isGroup)) return m.reply(`[!] Masukkan durasi premium *( dalam hari )*`)
	if ((m.quoted && isNaN(args[0])) || (!m.quoted && isNaN(args[1]) && m.isGroup)) return m.reply(`[!] Durasi harus dalam format angka.`)
	let durasi = parseInt(args[1] ? args[1] : args[0])
	prems.push({user: who, date: new Date() * 1 + durasi * cooldown})
	user[who].expired = +new Date() + durasi * cooldown
	await conn.sendMessage(m.chat, { text: `@${(who || '').replace(/@s\.whatsapp\.net/g, '')} Menjadi User Premium.\n\n*Durasi : ${durasi} hari*`, mentions: [who] }, { quoted: m })
}

handler.mengroup = ['addprem <@tag>']
handler.tagsowner = ['owner']
handler.command = /^(addprem(ium)?)$/i

handler.owner = true

export default handler