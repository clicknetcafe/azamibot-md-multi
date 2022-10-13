import db from '../lib/database.js'

String.prototype.includesOneOf = function(arrayOfStrings) {
	if(!Array.isArray(arrayOfStrings)) {
	throw new Error('includesOneOf only accepts an array')
	}
	return arrayOfStrings.some(str => this.includes(str))
}

let handler = async (m, { conn, args, command, usedPrefix }) => {
	const item = (args[0] || '').toLowerCase()
	let ini_txt = `Contoh : *${usedPrefix + command} limit 100*\n\n`
	ini_txt += `Data yang dapat di reset :\n`
	ini_txt += `- exp\n`
	ini_txt += `- money\n`
	ini_txt += `- limit\n`
	ini_txt += `- potion\n`
	ini_txt += `- emerald\n`
	ini_txt += `- diamond\n`
	ini_txt += `- gold`
	if (isNaN(args[1]) || !args[1]) return m.reply(`set jumlah dengan angka\n\nContoh : *${usedPrefix + command} limit 100*`)
	if (item.toLowerCase().includesOneOf(['exp','money','limit','potion','emerald','diamond','gold'])) {
		let user = db.data.users
		let ini_txt = `List users :\n\n`
		for (let x of Object.keys(chat)) {
			try {
				user[x][item] = parseInt(args[1])
				if (item == 'exp') user[x].level = 0
			} catch (e) {
				console.log(e)
			}
		}
		m.reply(`data ${item} semua user diset menjadi ${args[1]}.`)
	} else {
		m.reply(ini_txt)
	}
}

handler.mengroup = ['setall <data>']
handler.tagsgroup = ['owner']
handler.command = /^(setall)$/i

handler.owner = true

export default handler