import db from '../lib/database.js'

String.prototype.includesOneOf = function(arrayOfStrings) {
	if(!Array.isArray(arrayOfStrings)) {
	throw new Error('includesOneOf only accepts an array')
	}
	return arrayOfStrings.some(str => this.includes(str))
}

let handler = async (m, { conn, args, command, usedPrefix }) => {
	const item = (args[0] || '').toLowerCase()
	if (isNaN(args[1]) || !args[1]) return m.reply(`set jumlah dengan angka\n\nContoh : *${usedPrefix + command} limit 100*`)
	if (item.toLowerCase().includesOneOf(['money','limit','potion','emerald','diamond','gold'])) {
		let chat = db.data.users
		let ini_txt = `List users :\n\n`
		for (let x of Object.keys(chat)) {
			try {
				db.data.users[x][item] = parseInt(args[1])
			} catch (e) {
				console.log(e)
			}
			//ini_txt += `${x}\n`
		}
		m.reply(`data ${item} semua user diset menjadi ${args[1]}.`)
		//m.reply(ini_txt)
	} else {
		let ini_txt = `Data yang dapat di reset :\n\n`
		ini_txt += `money\n`
		ini_txt += `limit\n`
		ini_txt += `potion\n`
		ini_txt += `emerald\n`
		ini_txt += `diamond\n`
		ini_txt += `gold\n\n`
		ini_txt += `Contoh : *${usedPrefix + command} limit 100*`
		m.reply(ini_txt)
	}
}

handler.mengroup = ['reset <data>']
handler.tagsgroup = ['owner']
handler.command = /^((reset|set)all)$/i

handler.owner = true

export default handler