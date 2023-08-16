import db from '../../lib/database.js'
import { isNumber, ranNumb, somematch } from '../../lib/func.js'

let handler = async (m, { command, args, usedPrefix }) => {
	let user = db.data.users[m.sender]
	console.log("Pet anda : " + user.pet)
	let type = (args[0] || '').toLowerCase()
	let total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
	if (user[type] < total) return m.reply(`Kamu tidak memiliki *${global.rpg.emoticon(type)} ${type} crate*.`)
	if (user[type] < total) return m.reply(`Kamu hanya memiliki *${global.rpg.emoticon(type)} ${user[type]} ${type} crate* untuk dibuka.`)
	if (total > 100) total = 100
	if (somematch(['common', 'uncommon', 'mythic', 'legendary','petbox'], type)) {
		if (type == 'common') {
			let common = 0
			let uncommon = 0
			const money	= ranNumb(2000, 5000)
			const exp	  = ranNumb(175, 225)
			const trash	= ranNumb(10, 30)
			const potion   = ranNumb(1, 3)

			user.money  += money * total
			user.exp	+= exp * total
			user.trash  += trash * total
			user.potion += potion * total
			for (let x = 1; x <= total; x++) {
				user.commoncount += 1
				if (user.commoncount % 10 == 0) {
					user.common += 1
					common += 1
				}
				if (user.commoncount % 20 == 0) {
					user.uncommon += 1
					uncommon += 1
				}
			}
			user.common -= total

			let txt = `Kamu membuka *${total} ${global.rpg.emoticon(type)} ${type} crate* dan mendapatkan :\n`
			txt += `${global.rpg.emoticon('money')} ${money * total} money\n`
			txt += `${global.rpg.emoticon('exp')} ${exp * total} exp\n`
			txt += `${global.rpg.emoticon('trash')} ${trash * total} trash\n`
			txt += `${global.rpg.emoticon('potion')} ${potion * total} potion`
			if (common != 0) txt += `\nBonus : ${global.rpg.emoticon('common')} *${common} common*`
			if (uncommon != 0) txt += `\nBonus : ${global.rpg.emoticon('uncommon')} *${uncommon} uncommon*`
			m.reply(txt)
		} else if (type == 'uncommon') {
			let uncommon = 0
			let mythic = 0
			const money	= ranNumb(2000, 5000)
			const exp	  = ranNumb(275, 325)
			const trash	= ranNumb(10, 30)
			const potion   = ranNumb(1, 3)
			const wood	 = ranNumb(1, 3)
			const rock	 = ranNumb(1, 3)
			const string   = ranNumb(1, 3)

			user.money  += money * total
			user.exp	+= exp * total
			user.trash  += trash * total
			user.potion += potion * total
			user.wood   += wood * total
			user.rock   += rock * total
			user.string += string * total
			for (let x = 1; x <= total; x++) {
				user.uncommoncount += 1
				if (user.uncommoncount % 10 == 0) {
					user.uncommon += 1
					uncommon += 1
				}
				if (user.uncommoncount % 20 == 0) {
					user.mythic += 1
					mythic += 1
				}
			}
			user.uncommon -= total

			let txt = `Kamu membuka *${total} ${global.rpg.emoticon(type)} ${type} crate* dan mendapatkan :\n`
			txt += `${global.rpg.emoticon('money')} ${money * total} money\n`
			txt += `${global.rpg.emoticon('exp')} ${exp * total} exp\n`
			txt += `${global.rpg.emoticon('trash')} ${trash * total} trash\n`
			txt += `${global.rpg.emoticon('potion')} ${potion * total} potion\n`
			txt += `${global.rpg.emoticon('wood')} ${wood * total} wood\n`
			txt += `${global.rpg.emoticon('rock')} ${rock * total} rock\n`
			txt += `${global.rpg.emoticon('string')} ${string * total} string`
			if (uncommon != 0) txt += `\nBonus : ${global.rpg.emoticon('uncommon')} *${uncommon} uncommon*`
			if (mythic != 0) txt += `\nBonus : ${global.rpg.emoticon('mythic')} *${mythic} mythic*`
			m.reply(txt)
		} else if (type == 'mythic') {
			let mythic = 0
			let legendary = 0
			const money	= ranNumb(2000, 5000)
			const exp	  = ranNumb(300, 400)
			const trash	= ranNumb(10, 30)
			const potion   = ranNumb(1, 3)
			const wood	 = ranNumb(1, 3)
			const rock	 = ranNumb(1, 3)
			const string   = ranNumb(1, 3)
			const steel	= ranNumb(1, 3)

			user.money  += money * total
			user.exp	+= exp * total
			user.trash  += trash * total
			user.potion += potion * total
			user.wood   += wood * total
			user.rock   += rock * total
			user.string += string * total
			user.steel += steel * total
			for (let x = 1; x <= total; x++) {
				user.mythiccount += 1
				if (user.mythiccount % 10 == 0) {
					user.mythic += 1
					mythic += 1
				}
				if (user.mythiccount % 20 == 0) {
					user.legendary += 1
					legendary += 1
				}
			}
			user.mythic -= total

			let txt = `Kamu membuka *${total} ${global.rpg.emoticon(type)} ${type} crate* dan mendapatkan :\n`
			txt += `${global.rpg.emoticon('money')} ${money * total} money\n`
			txt += `${global.rpg.emoticon('exp')} ${exp * total} exp\n`
			txt += `${global.rpg.emoticon('trash')} ${trash * total} trash\n`
			txt += `${global.rpg.emoticon('potion')} ${potion * total} potion\n`
			txt += `${global.rpg.emoticon('wood')} ${wood * total} wood\n`
			txt += `${global.rpg.emoticon('rock')} ${rock * total} rock\n`
			txt += `${global.rpg.emoticon('string')} ${string * total} string\n`
			txt += `${global.rpg.emoticon('steel')} ${steel * total} steel`
			if (mythic != 0) txt += `\nBonus : ${global.rpg.emoticon('mythic')} *${mythic} mythic*`
			if (legendary != 0) txt += `\nBonus : ${global.rpg.emoticon('legendary')} *${legendary} legendary*`
			m.reply(txt)
		} else if (type == 'legendary') {
			let legendary = 0
			let pet = 0
			const money	= ranNumb(15000, 20000)
			const exp	  = ranNumb(375, 475)
			const trash	= ranNumb(10, 30)
			const potion   = ranNumb(1, 3)
			const wood	 = ranNumb(1, 3)
			const rock	 = ranNumb(1, 3)
			const string   = ranNumb(1, 3)
			const steel	= ranNumb(1, 3)

			user.money  += money * total
			user.exp	+= exp * total
			user.trash  += trash * total
			user.potion += potion * total
			user.wood   += wood * total
			user.rock   += rock * total
			user.string += string * total
			user.steel += steel * total
			for (let x = 1; x <= total; x++) {
				user.legendarycount += 1
				if (user.legendarycount % 10 == 0) {
					user.legendary += 1
					legendary += 1
				}
				if (user.legendarycount % 20 == 0) {
					user.pet += 1
					pet += 1
				}
			}
			user.legendary -= total

			let txt = `Kamu membuka *${total} ${global.rpg.emoticon(type)} ${type} crate* dan mendapatkan :\n`
			txt += `${global.rpg.emoticon('money')} ${money * total} money\n`
			txt += `${global.rpg.emoticon('exp')} ${exp * total} exp\n`
			txt += `${global.rpg.emoticon('trash')} ${trash * total} trash\n`
			txt += `${global.rpg.emoticon('potion')} ${potion * total} potion\n`
			txt += `${global.rpg.emoticon('wood')} ${wood * total} wood\n`
			txt += `${global.rpg.emoticon('rock')} ${rock * total} rock\n`
			txt += `${global.rpg.emoticon('string')} ${string * total} string\n`
			txt += `${global.rpg.emoticon('steel')} ${steel * total} rock`
			if (legendary != 0) txt += `\nBonus : ${global.rpg.emoticon('legendary')} *${legendary} legendary*`
			if (pet != 0) txt += `\nBonus : ${global.rpg.emoticon('pet')} *${pet} petbox*`
			m.reply(txt)
		} else {
			m.reply(`Comming soon :\n*${usedPrefix}pet*\n*${usedPrefix}petbattle*`)
		}
	} else {
		let nice = `${global.rpg.emoticon('common')} common\n`
		nice += `${global.rpg.emoticon('uncommon')} uncommon\n`
		nice += `${global.rpg.emoticon('mythic')} mythic\n`
		nice += `${global.rpg.emoticon('legendary')} legendary\n`
		nice += `${global.rpg.emoticon('pet')} petbox`
		m.reply(`Use Format *${usedPrefix + command} [crate] [count]*\nUsage example: *${usedPrefix + command} common 10*\n\n📍Crate list :\n${nice}`)
	}
}

handler.menufun = ['open', 'gacha'].map(v => v + ' [crate] [count]')
handler.tagsfun = ['rpg']
handler.command = /^(open|buka|gacha)$/i

handler.premium = true

export default handler