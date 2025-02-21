import db from '../../lib/database.js'
import { parsePhoneNumber } from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix }) => {
	let prems = db.data.datas.prems.filter(v => v.user !== '').sort((a, b) => a.date - b.date)
	if (prems.length == 0) return m.reply (`Tidak ada user premium !`)
	let z = 1, timer
	let txt = `*[ LIST PREMIUM USER ]*\n`
	for (let i of prems) {
		let name = await conn.getName(i.user)
		let pn = await parsePhoneNumber('+'+i.user.split('@')[0]).number.international
		timer = i.date - new Date()
		if (timer <= 0) {}
		else {
			txt += `\n*[${z}] ${name}*\n`
			txt += `┗⊱ ${timer.toTimeString()}`
			z++
		}
	}
	await m.reply(txt)
}

handler.menugroup = ['listprem']
handler.tagsgroup = ['group']
handler.command = /^(listprem|premlist)$/i

export default handler