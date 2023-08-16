import db from '../../lib/database.js'
import { isNumber } from '../../lib/func.js'

const cooldown = 1200000 // 10 masakan
const cooldownn = 300000 // 10 masakan

let handler = async (m, { command, usedPrefix, args }) => {
	let user = db.data.users[m.sender]
	let info = `Format : *${usedPrefix + command} [item] [jumlah]*\n`
	info += `Contoh : *${usedPrefix}${command} rendang 2*\n\n`
	info += `*━━━[ COOKING LIST ]━━━*\n`
	info += `%| 🍝 steak   | 🍢 sate%\n`
	info += `%| 🍜 rendang | 🥣 kornet%\n`
	info += `%| 🍱 nugget  | 🍲 bluefin%\n`
	info += `%| 🍛 seafood | 🥘 moluska%\n`
	info += `%| 🍣 sushi   | 🍤 squidprawm%`
	
	const item = (args[0] || '').toLowerCase()
	const total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
	if (new Date - user.lastmasak <= cooldown) return m.reply(`_Tunggu beberapa saat lagi . . ._\n🕖 *${((user.lastmasak) - new Date()).toTimeString()}*`)
	if (item == 'steak') {
		if (user.panda < 1 * total || user.ayam < 1 * total || user.kerbau < 1 * total || user.bawang < 33 * total || user.saus < 43 * total) {
			m.reply(`Diperlukan ${1 * total} panda, ${1 * total} ayam, ${1 * total} kerbau, ${33 * total} bawang, ${43 * total} saus.\n\nAnda memiliki :\n━ ${global.rpg.emoticon('panda')} ${user.panda} panda\n━ ${global.rpg.emoticon('ayam')} ${user.ayam} ayam\n━ ${global.rpg.emoticon('kerbau')} ${user.kerbau} kerbau\n━ ${user.bawang} bawang\n━ ${user.saus} saus`)
		} else {
			user.lastmasak = new Date * 1 + (cooldown * total)
			setTimeout(() => {
				user.panda -= 1 * total
				user.ayam -= 1 * total
				user.kerbau -= 1 * total
				user.bawang -= 33 * total
				user.saus -= 43 * total
				user.steak += total
				user.masakcount += 1
				m.reply(`Anda memasak *${total} ${global.rpg.emoticon('steak')} steak*.\n\nTotal steak : ${user.steak}`)
			}, cooldownn)
		}
	} else if (item == 'sate') {
		if (user.harimau < 1 * total || user.babihutan < 1 * total || user.sapi < 1 * total || user.bawang < 33 * total || user.saus < 43 * total) {
			m.reply(`Diperlukan ${1 * total} harimau, ${1 * total} babihutan, ${1 * total} sapi, ${33 * total} bawang, ${43 * total} saus.\n\nAnda memiliki :\n━ ${global.rpg.emoticon('harimau')} ${user.harimau} harimau\n━ ${global.rpg.emoticon('babihutan')} ${user.babihutan} babihutan\n━ ${global.rpg.emoticon('sapi')} ${user.sapi} sapi\n━ ${user.bawang} bawang\n━ ${user.saus} saus`)
		} else {
			user.lastmasak = new Date * 1 + (cooldown * total)
			setTimeout(() => {
				user.harimau -= 1 * total
				user.babihutan -= 1 * total
				user.sapi -= 1 * total
				user.bawang -= 33 * total
				user.saus -= 43 * total
				user.sate += total
				user.masakcount += 1
				m.reply(`Anda memasak *${total} ${global.rpg.emoticon('sate')} sate*.\n\nTotal sate : ${user.sate}`)
			}, cooldownn)
		}
	} else if (item == 'rendang') {
		if (user.gajah < 1 * total || user.buaya < 1 * total || user.bawang < 27 * total || user.cabai < 16 * total || user.jahe < 30 * total) {
			m.reply(`Diperlukan ${1 * total} gajah, ${1 * total} buaya, ${27 * total} bawang, ${16 * total} cabai, ${30 * total} jahe.\n\nAnda memiliki :\n━ ${global.rpg.emoticon('gajah')} ${user.gajah} gajah\n━ ${global.rpg.emoticon('buaya')} ${user.buaya} buaya\n━ ${user.bawang} bawang\n━ ${user.cabai} cabai, \n━ ${user.jahe} jahe`)
		} else {
			user.lastmasak = new Date * 1 + (cooldown * total)
			setTimeout(() => {
				user.gajah -= 1 * total
				user.buaya -= 1 * total
				user.bawang -= 27 * total
				user.cabai -= 16 * total
				user.jahe -= 30 * total
				user.rendang += total
				user.masakcount += 1
				m.reply(`Anda memasak *${total} ${global.rpg.emoticon('rendang')} rendang*.\n\nTotal rendang : ${user.rendang}`)
			}, cooldownn)
		}
	} else if (item == 'kornet') {
		if (user.kambing < 1 * total || user.monyet < 1 * total || user.saus < 72 * total || user.asam < 80 * total || user.kemiri < 40 * total) {
			m.reply(`Diperlukan ${1 * total} kambing, ${1 * total} monyet, ${72 * total} saus, ${80 * total} asam, ${40 * total} kemiri.\n\nAnda memiliki :\n━ ${global.rpg.emoticon('kambing')} ${user.kambing} kambing\n━ ${global.rpg.emoticon('monyet')} ${user.monyet} monyet\n━ ${user.saus} saus\n━ ${user.asam} asam, \n━ ${user.kemiri} kemiri`)
		} else {
			user.lastmasak = new Date * 1 + (cooldown * total)
			setTimeout(() => {
				user.kambing -= 1 * total
				user.monyet -= 1 * total
				user.saus -= 72 * total
				user.asam -= 80 * total
				user.kemiri -= 40 * total
				user.kornet += total
				user.masakcount += 1
				m.reply(`Anda memasak *${total} ${global.rpg.emoticon('kornet')} kornet*.\n\nTotal kornet : ${user.kornet}`)
			}, cooldownn)
		}
	} else if (item == 'nugget') {
		if (user.banteng < 1 * total || user.babi < 1 * total || user.saus < 72 * total || user.bawang < 34* total || user.kemiri < 50 * total) {
			m.reply(`Diperlukan ${1 * total} banteng, ${1 * total} babi, ${72 * total} saus, ${34* total} bawang, ${50 * total} kemiri.\n\nAnda memiliki :\n━ ${global.rpg.emoticon('banteng')} ${user.banteng} banteng\n━ ${global.rpg.emoticon('babi')} ${user.babi} babi\n━ ${user.saus} saus\n━ ${user.bawang} bawang, \n━ ${user.kemiri} kemiri`)
		} else {
			user.lastmasak = new Date * 1 + (cooldown * total)
			setTimeout(() => {
				user.banteng -= 1 * total
				user.babi -= 1 * total
				user.saus -= 72 * total
				user.bawang -= 34* total
				user.kemiri -= 50 * total
				user.nugget += total
				user.masakcount += 1
				m.reply(`Anda memasak *${total} ${global.rpg.emoticon('nugget')} nugget*.\n\nTotal nugget : ${user.nugget}`)
			}, cooldownn)
		}
	} else if (item == 'sushi') {
		if (user.lobster < 2 * total || user.hiu < 3 * total || user.bawal < 3 * total || user.asam < 60 * total || user.kemiri < 30 * total) {
			m.reply(`Diperlukan ${2 * total} lobster, ${3 * total} hiu, ${3 * total} bawal, ${60 * total} asam, ${30 * total} kemiri.\n\nAnda memiliki :\n━ ${global.rpg.emoticon('lobster')} ${user.lobster} lobster\n━ ${global.rpg.emoticon('hiu')} ${user.hiu} hiu\n━ ${global.rpg.emoticon('bawal')} ${user.bawal} bawal\n━ ${user.asam} asam, \n━ ${user.kemiri} kemiri`)
		} else {
			user.lastmasak = new Date * 1 + (cooldown * total)
			setTimeout(() => {
				user.lobster -= 2 * total
				user.hiu -= 3 * total
				user.bawal -= 3 * total
				user.asam -= 60 * total
				user.kemiri -= 30 * total
				user.sushi += total
				user.masakcount += 1
				m.reply(`Anda memasak *${total} ${global.rpg.emoticon('sushi')} sushi*.\n\nTotal sushi : ${user.sushi}`)
			}, cooldownn)
		}
	} else if (item == 'moluska') {
		if (user.udang < 3 * total || user.cumi < 3 * total || user.lele < 5 * total || user.saus < 54 * total || user.asam < 75 * total) {
			m.reply(`Diperlukan ${3 * total} udang, ${3 * total} cumi, ${5 * total} lele, ${54 * total} saus, ${75 * total} asam.\n\nAnda memiliki :\n━ ${global.rpg.emoticon('udang')} ${user.udang} udang\n━ ${global.rpg.emoticon('cumi')} ${user.cumi} cumi\n━ ${global.rpg.emoticon('lele')} ${user.lele} lele\n━ ${user.saus} saus, \n━ ${user.asam} asam`)
		} else {
			user.lastmasak = new Date * 1 + (cooldown * total)
			setTimeout(() => {
				user.udang -= 3 * total
				user.cumi -= 3 * total
				user.lele -= 5 * total
				user.saus -= 54 * total
				user.asam -= 75 * total
				user.moluska += total
				user.masakcount += 1
				m.reply(`Anda memasak *${total} ${global.rpg.emoticon('moluska')} moluska*.\n\nTotal moluska : ${user.moluska}`)
			}, cooldownn)
		}
	} else if (item == 'squidprawm') {
		if (user.kepiting < 2 * total || user.lumba < 3 * total || user.gurita < 7 * total || user.bawang < 26 * total || user.asam < 71 * total) {
			m.reply(`Diperlukan ${2 * total} kepiting, ${3 * total} lumba, ${7 * total} gurita, ${26 * total} bawang, ${71 * total} asam.\n\nAnda memiliki :\n━ ${global.rpg.emoticon('kepiting')} ${user.kepiting} kepiting\n━ ${global.rpg.emoticon('lumba')} ${user.lumba} lumba\n━ ${global.rpg.emoticon('gurita')} ${user.gurita} gurita\n━ ${user.bawang} bawang, \n━ ${user.asam} asam`)
		} else {
			user.lastmasak = new Date * 1 + (cooldown * total)
			setTimeout(() => {
				user.kepiting -= 2 * total
				user.lumba -= 3 * total
				user.gurita -= 7 * total
				user.bawang -= 26 * total
				user.asam -= 71 * total
				user.squidprawm += total
				user.masakcount += 1
				m.reply(`Anda memasak *${total} ${global.rpg.emoticon('squidprawm')} squidprawm*.\n\nTotal squidprawm : ${user.squidprawm}`)
			}, cooldownn)
		}
	} else if (item == 'bluefin') {
		if (user.paus < 1 * total || user.ikan < 2 * total || user.kemiri < 50 * total || user.cabai < 20 * total) {
			m.reply(`Diperlukan ${1 * total} paus, ${2 * total} ikan, ${50 * total} kemiri, ${20 * total} cabai.\n\nAnda memiliki :\n━ ${global.rpg.emoticon('paus')} ${user.paus} paus\n━ ${global.rpg.emoticon('ikan')} ${user.ikan} ikan\n━ ${user.kemiri} kemiri, \n━ ${user.cabai} cabai`)
		} else {
			user.lastmasak = new Date * 1 + (cooldown * total)
			setTimeout(() => {
				user.paus -= 1 * total
				user.ikan -= 2 * total
				user.kemiri -= 50 * total
				user.cabai -= 20 * total
				user.bluefin += total
				user.masakcount += 1
				m.reply(`Anda memasak *${total} ${global.rpg.emoticon('bluefin')} bluefin*.\n\nTotal bluefin : ${user.bluefin}`)
			}, cooldownn)
		}
	} else if (item == 'seafood') {
		if (user.orca < 1 * total || user.nila < 10 * total || user.kemiri < 50 * total || user.cabai < 20 * total) {
			m.reply(`Diperlukan ${1 * total} orca, ${10 * total} nila, ${50 * total} kemiri, ${20 * total} cabai.\n\nAnda memiliki :\n━ ${global.rpg.emoticon('orca')} ${user.orca} orca\n━ ${global.rpg.emoticon('nila')} ${user.nila} nila\n━ ${user.kemiri} kemiri, \n━ ${user.cabai} cabai`)
		} else {
			user.lastmasak = new Date * 1 + (cooldown * total)
			setTimeout(() => {
				user.orca -= 1 * total
				user.nila -= 10 * total
				user.kemiri -= 50 * total
				user.cabai -= 20 * total
				user.seafood += total
				user.masakcount += 1
				m.reply(`Anda memasak *${total} ${global.rpg.emoticon('seafood')} seafood*.\n\nTotal seafood : ${user.seafood}`)
			}, cooldownn)
		}
	} else {
		m.reply(info.replaceAll('%', '```'))
	}
}

handler.menufun = ['cook'].map(v => v + ' [item] [count]')
handler.tagsfun = ['rpg']
handler.command = /^((cook(ing)?)|((me)?masak))$/i

handler.cooldown = cooldown
handler.premium = true

export default handler