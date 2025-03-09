import db from '../../lib/database.js'
import { isNumber, somematch } from '../../lib/func.js'

const cooldown = 60000

let handler = async (m, { conn, participants, usedPrefix, command, args, isOwner, isPrems, isAdmin }) => {
	let admin = []
	for (let i of participants) { if (/admin/i.test(i.admin || '')) admin.push(i.id) }
	if ((!m.quoted && !args[1]) || (m.quoted && !args[0])) throw `Format : ${usedPrefix + command} <timer> <@tag/quote>\n1 = 1 menit\n5 = 5 menit ... dst.\n\nContoh : *${usedPrefix + command} 10 @Alan*`
	let total = Math.floor(isNumber(args[0]) ? Math.min(Math.max(parseInt(args[0]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
	let who = args[1] ? args[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : !m.isGroup ? m.chat : m.quoted ? m.quoted.sender : m.mentionedJid ? m.mentionedJid[0] : ''
	if (!who) throw 'Tag salah satu lah'
	let ow = db.data.datas
	let data = [...global.mods, ...ow.rowner.map(v => v[0]), ...ow.owner.map(v => v[0])].map(v => v + '@s.whatsapp.net')
	if (somematch(data, who) || who == conn.user.jid
		|| db.data.datas.prems.some(v => v.user == who)) return m.reply(`Gaboleh gitu :v`)
	if (isOwner || isAdmin || isPrems) {
		if (somematch(admin, who) && !isOwner) throw `Gaboleh gitu sesama admin :v`
		if (total > 200 && !isPrems) throw `_... >> not premium ..._\n[!] Maksimal ${command} : 200 menit.`
		if (total > 400 && !isOwner) throw `[!] Maksimal ${command} : 400 menit.`
		let users = db.data.users[who]
		if (!users) throw `User tidak ada dalam database.`
		if (users.permaban) throw `[!] Tidak perlu *${command}* karena sudah di *ban*`
		if (users.banned) return m.reply(`Dia sudah di *mute* sebelumnya.`)
		await conn.sendMsg(m.chat, { react: { text: '👍🏻', key: m.key } })
		users.banned = true
		users.lastbanned = new Date * 1
		users.bannedcd = cooldown * total
		if (isOwner) users.spamcount = 0
		await conn.reply(who, `User @${who.split('@')[0]} di *mute* selama ${total} menit.`, fliveLoc, { mentions: [who] })
	} else {
		m.reply(`*「ADMIN GROUP ONLY」*`)
	}
}

handler.menugroup = ['diem <timer> @tag']
handler.tagsgroup = ['group']
handler.command = /^(di(e|a)m|silent)$/i

export default handler