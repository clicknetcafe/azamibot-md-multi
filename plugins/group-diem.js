import db from '../lib/database.js'
//const cooldown = 1000 // 1 detik
//const cooldown = 60000 // 1 menit
//const cooldown = 3600000 // 1 jam
//const cooldown = 86400000 // 1 hari
//const cooldown = 2592000000 // 1 bulan

const cooldown = 60000
const data = global.owner.filter(([id, isCreator]) => id && isCreator)
const we = data.map(([id]) => id).toString()

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isPrems, isAdmin }) => {
	if ((!m.quoted && !args[1]) || (m.quoted && !args[0])) return m.reply(`Format : ${usedPrefix + command} ${m.quoted ? '' : '@tag'} <timer>\n1 = 1 menit\n5 = 5 menit ... dst.\n\nContoh : *${usedPrefix + command} ${m.quoted ? '' : '@Alan'} 10*`)
	const total = m.quoted ? Math.floor(isNumber(args[0]) ? Math.min(Math.max(parseInt(args[0]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1 : Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
	let who
	if (m.isGroup) who = m.quoted ? m.quoted.sender : m.mentionedJid[0]
	else who = m.chat
	if (!who) throw 'Tag salah satu lah'
	if (who.includes(we) || who.includes(m.conn.user.jid)) throw `Gaboleh gitu ${who.includes(m.conn.user.jid) ? 'ama bot ' : ''}:v`
	if (isOwner || isAdmin || isPrems) {
		if (total > 60 && !isPrems) return m.reply(`_... >> not premium ..._\n[!] Maksimal ${command} : 60 menit.`)
		if (total > 140 && !isOwner) return m.reply(`[!] Maksimal ${command} : 140 menit.`)
		try {
			let users = db.data.users
			users[who].banned = true
			await conn.sendMessage(m.chat, { text: `@${(who || '').replace(/@s\.whatsapp\.net/g, '')} di *banned* selama ${total} menit.`, mentions: [who] })
			setTimeout(() => {
				users[who].banned = false
			}, cooldown)
			setTimeout(() => {
				users[who].banned = false
				conn.sendMessage(m.chat, { text: `@${(who || '').replace(/@s\.whatsapp\.net/g, '')} udh gk di ban slur, jan spam lagi yak!`, mentions: [who] })
			}, cooldown + 2000)
		} catch (e) {
			console.log(e)
			m.reply(`User tidak ada dalam database.`)
		}
	} else {
		m.reply(`*「ADMIN GROUP ONLY」*`)
	}
}

handler.menugroup = ['diem @tag <timer>']
handler.tagsgroup = ['owner']
handler.command = /^(diem|silent)$/i

handler.group = true

export default handler

function isNumber(number) {
	if (!number) return number
	number = parseInt(number)
	return typeof number == 'number' && !isNaN(number)
}