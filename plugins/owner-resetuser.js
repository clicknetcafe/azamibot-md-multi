import db from '../lib/database.js'

String.prototype.includesOneOf = function(arrayOfStrings) {
	if(!Array.isArray(arrayOfStrings)) {
	throw new Error('includesOneOf only accepts an array')
	}
	return arrayOfStrings.some(str => this.includes(str))
}

let handler = async (m, { conn, args, command, usedPrefix }) => {
	const item = (args[0] || '').toLowerCase()
	let ini_txt = `Contoh : *${usedPrefix + command} limit 100 @tag*\n\n`
	ini_txt += `Data yang dapat di reset :\n`
	ini_txt += `- exp\n`
	ini_txt += `- money\n`
	ini_txt += `- limit\n`
	ini_txt += `- potion\n`
	ini_txt += `- emerald\n`
	ini_txt += `- diamond\n`
	ini_txt += `- gold`
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : m.quoted ? m.quoted.sender : ''
    if (!who) return m.reply(ini_txt)
    let user = db.data.users
    if (!(who in user)) return m.reply(`User ${who} not in database`)
	if (isNaN(args[1]) || !args[1]) return m.reply(`set jumlah dengan angka\n\nContoh : *${usedPrefix + command} limit 100 @tag*`)
	if (item.toLowerCase().includesOneOf(['exp','money','limit','potion','emerald','diamond','gold'])) {
		user[who][item] = parseInt(args[1])
		if (item == 'exp') user[who].level = 0
		await m.reply(`Berhasi mengubah ${item} *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* menjadi ${args[1]}`, null, { mentions: [who] })
	} else {
		m.reply(ini_txt)
	}
}

handler.mengroup = ['setuser <data>']
handler.tagsgroup = ['owner']
handler.command = /^(setuser)$/i

handler.owner = true

export default handler