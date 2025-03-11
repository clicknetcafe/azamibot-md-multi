import db from '../../lib/database.js'
import { isNumber } from '../../lib/func.js'
const { proto } = await (await import('@whiskeysockets/baileys')).default

const cooldown = 60000

let handler = async (m, { conn, args, usedPrefix, command, isPrems, isAdmin, isOwner }) => {
	if (m.chat.includes('120363217780015387') && !isOwner) throw `[ hehe ]`
	if (isNaN(args[0] || 'p')) throw `Format : ${usedPrefix + command} <timer>\n1 = 1 menit\n5 = 5 menit ... dst.\n\nContoh : *${usedPrefix + command} 10*`
	if (isPrems || isAdmin || isOwner) {
		const total = Math.floor(isNumber(args[0]) ? Math.min(Math.max(parseInt(args[0]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
		if (total > 200 && !isPrems) throw `_... >> not premium ..._\n[!] Maksimal ${command} : 200 menit.`
		if (total > 400 && !isOwner) throw `[!] Maksimal ${command} : 400 menit.`
		if (args[1] && !isOwner) throw '*「OWNER BOT ONLY」*'
		let grup = args[1] ? args[1] : m.isGroup ? m.chat : ''
		if (!grup) throw `input group id !`
		let chat = db.data.chats[grup]
		if (!chat) return m.reply(`[!] Invalid ID Group`)
		chat.isBanned = true
		chat.lastmute = new Date * 1
		chat.mutecd = cooldown * total
		chat.spamcount = 0
		try {
			let msg = await conn.reply(grup, `Group di *mute* selama ${total} menit.`, m)
			let pin = db.data.chats[grup].pinmsg
			pin['mutegc'] = msg.key
			await conn.sendMsg(grup, { pin: pin['mutegc'], type: proto.PinInChat.Type['PIN_FOR_ALL'], time: 86400 })
		} catch (e) {
			console.log(e)
			m.reply(e.message)
		}
	} else throw `*「ADMIN / PREM / OWNER ONLY」*`
}

handler.menugroup = ['mute']
handler.menuowner = ['mute']
handler.tagsgroup = ['group']
handler.tagsowner = ['owner']
handler.command = /^(mute|senyap)$/i

handler.cooldown = cooldown

export default handler