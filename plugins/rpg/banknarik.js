import db from '../../lib/database.js'
import { isNumber, somematch } from '../../lib/func.js'

let handler = async (m, { conn, command, usedPrefix, args }) => {
	let user = db.data.users[m.sender]
	if (user.atm == 0) return m.reply(`[!] Anda belum memiliki ATM.\n\ngunakan command *${usedPrefix}atm create* untuk memproses.`)
	if (somematch(['all', 'semua'], args[0])) args[0] = user.atm - 50000
	let total = Math.floor(isNumber(args[0]) ? Math.min(Math.max(parseInt(args[0]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
	if ((user.atm - total) >= 50000) {
		user.atm -= total
		user.money += total
		m.reply(`Sukses menarik sebesar ${total} Money 💹`)
	} else m.reply(`[❗] Rekening anda tidak mencukupi untuk menarik ${total} money 💹`)
}

handler.menufun = ['tarik <jumlah>']
handler.tagsfun = ['rpg']
handler.command = /^((t|n)arik(all)?)$/i

export default handler