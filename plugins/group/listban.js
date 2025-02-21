import db from '../../lib/database.js'
import { parsePhoneNumber } from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, command, isOwner, text }) => {
	let groups
	try { groups = Object.values(await conn.groupFetchAllParticipating()).map(v => v.id) }
	catch { return }
	let gc = db.data.chats
	let pc = db.data.users
	let chats = Object.entries(gc).filter(v => v[1].isBanned).map(([v]) => v)
	let users = Object.entries(pc).filter(v => v[1].banned && !(v[0].startsWith('212') || v[0].startsWith('265'))).map(([v]) => v)
	let z = 1, y = 1, name, sisa, timer
	let txt = `*Total Banned User : ${Object.entries(pc).filter(user => user[1].banned).length}*\n+212 & +265 Number is Auto Banned`
	txt += `\n\n*[ BANNED GROUP ]*`
	for (let x of chats) {
		timer = gc[x].mutecd - (new Date - gc[x].lastmute)
		if (!gc[x].permaBan && timer <= 0) {}
		else {
			if (groups.includes(x)) name = await conn.getName(x)
			else name = 'Unknown ( Bot Leave )'
			sisa = gc[x].permaBan ? 'Status : Permanent Banned' : isNaN(timer) ? 'Status : Soft Banned' : `Mute : ${timer.toTimeString()}`
			txt += `\n*[${z}] ${name.replace(/\n/g, '').trim()}*\n`
			txt += '┗⊱ '+sisa
			z++
		}
	}
	txt += `\n\n*[ BANNED USER ]*`
	for (let x of users) {
		timer = pc[x].bannedcd - (new Date - pc[x].lastbanned)
		if (!pc[x].permaban && timer <= 0) {}
		else {
			let pn = await parsePhoneNumber('+'+x.split('@')[0]).number.international
			name = await conn.getName(x)
			sisa = pc[x].permaban ? 'Status : Permanent Banned' : isNaN(timer) ? 'Status : Soft Banned' : `Mute : ${timer.toTimeString()}`
			txt += `\n*[${y}] ${name.replace(/\n/g, '').trim()}*\n`
			txt += '┗⊱ '+sisa
			y++
		}
	}
	await m.reply(txt)
}

handler.menugroup = ['listbanned']
handler.tagsgroup = ['group']
handler.command = /^((list|daftar)(ban(ned)?|bloc?k|mute))$/i

export default handler