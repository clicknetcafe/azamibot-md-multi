import db from '../lib/database.js'
import { parsePhoneNumber } from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix }) => {
	let prems = db.data.datas.prems.filter(v => v.user !== '').sort((a, b) => a.date - b.date)
	if (prems.length == 0) return m.reply (`Tidak ada user premium !`)
	let namebot = await conn.getName(conn.user.jid)
	let timer, array = []
	for (let i of prems) {
		let name = await conn.getName(i.user)
		let pn = await parsePhoneNumber('+' + i.user.split('@')[0])
		pn = pn.number.international
		timer = i.date - new Date()
		if (timer <= 0) {}
		else await array.push({ title: `✨ ${name}${name != pn ? ` (${pn})` : ''}`, description: `Durasi : ${timer.toTimeString()}`})
	}
	let sections = [{ title: `━ ━ ━ ━ 『 List Premium Users 』 ━ ━ ━ ━`, rows: array }]
	let listMessage = {
		text: `*Request From :* @${m.sender.split`@`[0]}\n\n*List Premium :* ${prems.length} Users`,
		mentions: [m.sender],
		footer: pauthor,
		title: `━ ━ 『 *LIST PREMIUM* 』 ━ ━`,
		buttonText: `Premium List`,
		sections
	}
	await conn.sendMessage(m.chat, listMessage, { quoted : m })
}

handler.menugroup = ['listprem']
handler.tagsgroup = ['group']
handler.command = /^(listprem|premlist)$/i

export default handler