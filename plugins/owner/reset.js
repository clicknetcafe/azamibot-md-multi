import db from '../../lib/database.js'
import { isNumber, somematch } from '../../lib/func.js'

let handler = async (m, { conn, args, command, usedPrefix }) => {
	const item = (args[0] || '').toLowerCase()
	let txt = `Contoh : *${usedPrefix + command} limit 100*\n\n`
	txt += `Data yang dapat di reset :\n`
	txt += `- exp\n`
	txt += `- money\n`
	txt += `- atm\n`
	txt += `- limit\n`
	txt += `- potion\n`
	txt += `- emerald\n`
	txt += `- diamond\n`
	txt += `- gold`
	args[1] = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
	if (args[1] > 999999999999999) args[1] = 999999999999999
	if (somematch(['exp','money','atm','limit','potion','emerald','diamond','gold'], item)) {
		let user = db.data.users
		let txt = `List users :\n\n`
		for (let x of Object.keys(user)) {
			try {
				user[x][item] = args[1]
				if (item == 'exp') user[x].level = 0
			} catch (e) {
				console.log(e)
			}
		}
		m.reply(`data ${item} semua user diset menjadi ${args[1]}.`)
	} else {
		m.reply(txt)
	}
}

handler.menuowner = ['setall <data>']
handler.tagsowner = ['ownerr']
handler.command = /^((re)?setall)$/i

handler.rowner = true

export default handler