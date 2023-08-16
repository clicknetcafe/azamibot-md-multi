import db from '../../lib/database.js'
import { isNumber } from '../../lib/func.js'

let handler = async (m, { conn, command, usedPrefix, args }) => {
	let user = db.data.users[m.sender]
	if (user.atm == 0) return m.reply(`[!] Anda belum memiliki ATM.\n\ngunakan command *${usedPrefix}atm create* untuk memproses.`)
	let total = Math.floor(isNumber(args[0]) ? Math.min(Math.max(parseInt(args[0]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
	if (command.includes('all')) total = user.money
	if ((user.money - total) > 0) {
		user.money -= total
		user.atm += total
		m.reply(`Sukses menabung sebesar ${total} Money 💹`)
	} else {
		m.reply(`[❗] Uang anda tidak mencukupi untuk menabung ${total} money 💹`)
	}
}

handler.menufun = ['nabung <jumlah>']
handler.tagsfun = ['rpg']
handler.command = /^((t|n)abung(all)?)$/i

export default handler