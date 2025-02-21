import db from '../../lib/database.js'
import { parsePhoneNumber } from 'awesome-phonenumber'
import { ranNumb, delay, somematch } from '../../lib/func.js'

// example if they hve multiple number, just mute all their number
const meiko = ['6287724795484','6288221508560','6283863274997']
const rio = ['6289684337738','6289504884084']
const cooldown = 60000

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isBotAdmin }) => {
	let user = db.data.users
	let data = db.data.datas
	let batch = [meiko, rio].map(v => v = { status: false, numbers: v.map(w => w+'@s.whatsapp.net') })
	let petinggi = [...global.mods, ...db.data.datas.owner.map(([number]) => number), ...db.data.datas.rowner.map(([number]) => number)].map(v => v + '@s.whatsapp.net')
	if (args[0] == 'reset') {
		if (!isOwner) return m.reply(`*「OWNER BOT ONLY」*`)
		for (let x of Object.keys(user)) {
			if (user[x].spamcount > 0) user[x].spamcount = 0
		}
		await m.reply(`Spam Count telah direset.`)
		data.spamcountreset = +new Date()
	} else if (args[1] && args[1] == 'mute') {
		if (!isOwner) return m.reply(`*「OWNER BOT ONLY」*`)
		let u, total, array = []
		let ia = !isNaN(parseInt(args[0])) ? parseInt(args[0]) : 20
		for (let x of Object.keys(user)) {
			if (!petinggi.includes(x) && user[x].spamcount > ia) await array.push(x)
		}
		let differ = batch.map(v => v.numbers)
		let differflat = differ.flat()
		for (let x of array) {
			if (somematch(differflat, x)) {
				for (let y of batch) {
					if (somematch(y.numbers, x)) y.status = true
				}
			} else {
				u = user[x]
				total = (u.spamcount + ranNumb(1, 10)) * 3
				u.banned = true
				u.lastbanned = new Date * 1
				u.bannedcd = cooldown * total
				u.spamcount = 0
				await conn.reply(x, `User @${x.replace(/@s\.whatsapp\.net/g, '')} di *mute* selama ${total} menit.`, null, { mentions: [x] })
				await delay(ranNumb(1000, 1500))
			}
		}
		for (let x of batch) {
			if (x.status) {
				let palingbyk = []
				for (let y of x.numbers) {
					palingbyk.push(user[y].spamcount)
				}
				let high = Math.max.apply(0, palingbyk)
				for (let y of x.numbers) {
					u = user[y]
					total = (high + ranNumb(1, 10)) * 3
					u.banned = true
					u.lastbanned = new Date * 1
					u.bannedcd = cooldown * total
					u.spamcount = 0
					await conn.reply(y, `User @${y.replace(/@s\.whatsapp\.net/g, '')} di *mute* selama ${total} menit.`, fliveLoc, { mentions: [y] })
					await delay(ranNumb(1000, 1500))
				}
			}
		}
		for (let x of Object.keys(user)) {
			if (user[x].spamcount > 0) user[x].spamcount = 0
		}
		data.spamcountreset = +new Date()
		await conn.reply(m.chat, `Sukses Mute Semua User Dengan Count ${args[0]} ke Atas.`, fliveLoc)
	} else {
		let y,z = 1, name, array = []
		let ia = !isNaN(parseInt(args[0])) ? parseInt(args[0]) : 20
		if (ia < 0) ia = 0
		let txt = `*[ LIST SPAM USER ]*\nLast Reset : ${new Date(data.spamcountreset)}\n`
		for (let x of Object.keys(user)) {
			if (!petinggi.includes(x) && user[x].spamcount > ia) {
				let pn = await parsePhoneNumber('+'+x.split('@')[0]).number.international
				y = user[x].spamcount
				name = await conn.getName(x)
				await array.push({ title: `*${name.replace(/\n/g, '').trim()}*${name != pn ? ` (${pn})` : ''}`, rowId: `${usedPrefix}diem ${(y + ranNumb(1, 10)) * 3} ${x}`, description: `spam count : ${y}`, user: x, count: y })
			}
		}
		array = await array.sort((a, b) => b.count - a.count)
		for (let x of array) {
			txt += `\n*[${z}]* ${x.title}\n`
			txt += `┗⊱ spam count : ${x.count}`
			z++
		}
		await m.reply(txt)
	}
}

handler.menugroup = ['listspam']
handler.tagsgroup = ['group']
handler.command = /^(listspam)$/i

export default handler