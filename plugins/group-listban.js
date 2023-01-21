import db from '../lib/database.js'
import { parsePhoneNumber } from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, command, isOwner, text }) => {
	let groups
	try { groups = Object.values(await conn.groupFetchAllParticipating()).map(v => v.id) }
	catch { return }
	let gc = db.data.chats
	let pc = db.data.users
	let chats = Object.entries(gc).filter(v => v[1].isBanned).map(([v]) => v)
	let users = Object.entries(pc).filter(v => v[1].banned && !(v[0].startsWith('212') || v[0].startsWith('265'))).map(([v]) => v)
	let x, name, sisa, timer, array = [], array2 = []
	text = text.split('|')
	for (let x of chats) {
		timer = gc[x].mutecd - (new Date - gc[x].lastmute)
		if (!gc[x].permaBan && timer <= 0) {}
		else {
			if (groups.includes(x)) name = await conn.getName(x)
			else name = 'Unknown ( Bot Leave )'
			sisa = gc[x].permaBan ? 'Status : Permanent Banned Group' : isNaN(timer) ? 'Status : Soft Banned' : `Mute : ${timer.toTimeString()}`
			await array.push({ title: `✨ ${name}`, rowId: `${usedPrefix + command} |${x}`, description: sisa })
		}
	}
	for (let x of users) {
		timer = pc[x].bannedcd - (new Date - pc[x].lastbanned)
		if (!pc[x].permaban && timer <= 0) {}
		else {
			let pn = await parsePhoneNumber('+' + x.split('@')[0])
			pn = pn.number.international
			name = await conn.getName(x)
			sisa = pc[x].permaban ? 'Status : Permanent Banned' : isNaN(timer) ? 'Status : Soft Banned' : `Mute : ${timer.toTimeString()}`
			await array2.push({ title: `✨ ${name}${name != pn ? ` (${pn})` : ''}`, rowId: `${usedPrefix + command} |${x}`, description: `${sisa}` })
		}
	}
	if (array.length == 0) array = [{ title: 'None'}]
	if (array2.length == 0) array2 = [{ title: 'None'}]
	let sections = [{ title: `━ ━ ━ ━ 『 List Banned Group 』 ━ ━ ━ ━`, rows: array }, { title: `━ ━ ━ ━ 『 List Banned User 』 ━ ━ ━ ━`, rows: array2 }]
	let listMessage = {
		text: `*Request From :* @${m.sender.split`@`[0]}\n\n*Total Banned User : ${Object.entries(pc).filter(user => user[1].banned).length}*\n+212 & +265 Number is Auto Banned`,
		mentions: [m.sender],
		footer: pauthor,
		title: `━ ━ 『 *LIST BANNED* 』 ━ ━`,
		buttonText: `Banned List`,
		sections
	}
	if (text[1]) {
		x = text[1]
		try {
			if (x.includes('g.us')) {
				if (groups.includes(x)) name = await conn.getName(x)
				else name = 'Unknown ( Bot Leave )'
				let txt = `*Name :* ${name}\n`
				txt += `*id :* ${x}\n`
				txt += gc[x].permaBan ? '*Status :* Permanent Banned Group' : `*Mute :* ${(gc[x].mutecd - (new Date - gc[x].lastmute)).toTimeString()}`
				m.reply(txt)
			} else {
				name = await conn.getName(x)
				let pn = await parsePhoneNumber('+' + x.split('@')[0])
				let txt = `*Name :* ${name}\n`
				txt += `*Number :* ${pn.number.international}\n`
				txt += pc[x].permaban ? '*Status :* Permanent Banned User' : `*Mute :* ${(pc[x].bannedcd - (new Date - pc[x].lastbanned)).toTimeString()}`
				m.reply(txt)
			}
		} catch (e) { console.log(e) }
	} else await conn.sendMessage(m.chat, listMessage, { quoted : m })
}

handler.menugroup = ['bannedlist']
handler.tagsgroup = ['group']
handler.command = /^((list|daftar)(ban(ned)?|bloc?k|mute))$/i

export default handler