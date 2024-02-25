import db from '../../lib/database.js'
import { isNumber, somematch } from '../../lib/func.js'

let handler = async (m, { conn, args, command, usedPrefix }) => {
	const item = (args[0] || '').toLowerCase()
	let txt = `Contoh : *${usedPrefix + command} limit 100 @tag*\n\n`
	txt += `Data yang dapat di reset :\n`
	txt += `- exp\n`
	txt += `- money\n`
	txt += `- atm\n`
	txt += `- limit\n`
	txt += `- potion\n`
	txt += `- emerald\n`
	txt += `- diamond\n`
	txt += `- gold`
	let who = m.mentionedJid?.[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : m.quoted ? m.quoted.sender : ''
	if (!who) return m.reply(txt)
	let user = db.data.users
	if (!(who in user)) return m.reply(`User ${who} not in database`)
	args[1] = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
	if (args[1] > 999999999999999) args[1] = 999999999999999
	if (somematch(['exp','money','atm','limit','potion','emerald','diamond','gold'], item)) {
		user[who][item] = args[1]
		if (item == 'exp') user[who].level = 0
		await m.reply(`Berhasi mengubah ${item} *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* menjadi ${args[1]}`, null, { mentions: [who] })
	} else {
		m.reply(txt)
	}
}

handler.menuowner = ['setuser <data>']
handler.tagsowner = ['owner']
handler.command = /^((re)?setuser)$/i

handler.owner = true

export default handler