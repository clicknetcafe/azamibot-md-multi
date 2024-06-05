import db from '../../lib/database.js'
import { isNumber, readMore, somematch } from '../../lib/func.js'

const items = {
	buy: {
		limit: {
			money: 1000
		},
		potion: {
			money: 1250,
		},
		wood: {
			money: 2000,
		},
		rock: {
			money: 2000,
		},
		string: {
			money: 2500,
		},
		iron: {
			money: 3000,
		},
		sand: {
			money: 1500,
		},
		emerald: {
			money: 200000,
		},
		diamond: {
			money: 300000,
		},
		gold: {
			money: 100000,
		},
		petfood: {
			money: 2500,
		},
		bawang: {
			money: 150,
		},
		cabai: {
			money: 250,
		},
		kemiri: {
			money: 100,
		},
		jahe: {
			money: 100,
		},
		saus: {
			money: 70,
		},
		asam: {
			money: 50,
		},
		bibitapel: {
			money: 150,
		},
		bibitanggur: {
			money: 200,
		},
		bibitmangga: {
			money: 250,
		},
		bibitpisang: {
			money: 50,
		},
		bibitjeruk: {
			money: 300,
		},
		common: {
			money: 10000,
		},
		uncommon: {
			money: 15000,
		},
		mythic: {
			money: 25000,
		},
		legendary: {
			money: 40000,
		},
		banteng: {
			money: 11000,
		},
		harimau: {
			money: 18000,
		},
		gajah: {
			money: 16000,
		},
		kambing: {
			money: 12000,
		},
		panda: {
			money: 20000,
		},
		buaya: {
			money: 5000,
		},
		kerbau: {
			money: 9000,
		},
		sapi: {
			money: 10000,
		},
		monyet: {
			money: 5000,
		},
		babihutan: {
			money: 4000,
		},
		babi: {
			money: 8000,
		},
		ayam: {
			money: 3000,
		},
		orca: {
			money: 20000,
		},
		paus: {
			money: 45000,
		},
		lumba: {
			money: 5000,
		},
		hiu: {
			money: 4500,
		},
		ikan: {
			money: 2500,
		},
		lele: {
			money: 3000,
		},
		bawal: {
			money: 3500,
		},
		nila: {
			money: 3000,
		},
		kepiting: {
			money: 7000,
		},
		lobster: {
			money: 15000,
		},
		gurita: {
			money: 3000,
		},
		cumi: {
			money: 5000,
		},
		udang: {
			money: 7500,
		},
		horse: {
			money: 500000,
		},
		cat: {
			money: 500000,
		},
		fox: {
			money: 500000,
		},
		dog: {
			money: 500000,
		},
		wolf: {
			money: 1000000,
		},
		centaur: {
			gold: 15,
		},
		phoenix: {
			emerald: 10,
		},
		dragon: {
			diamond: 10,
		},
		rumahsakit: {
			money: 2000000,
		},
		restoran: {
			money: 2500000,
		},
		pabrik: {
			money: 1000000,
		},
		tambang: {
			money: 2000000,
		},
		pelabuhan: {
			money: 2500000,
		}
	},
	sell: {
		potion: {
			money: 125,
		},
		petfood: {
			money: 125,
		},
		trash: {
			money: 20,
		},
		banteng: {
			money: 9900,
		},
		harimau: {
			money: 16200,
		},
		gajah: {
			money: 14400,
		},
		kambing: {
			money: 10800,
		},
		panda: {
			money: 18000,
		},
		buaya: {
			money: 4500,
		},
		kerbau: {
			money: 8100,
		},
		sapi: {
			money: 9000,
		},
		monyet: {
			money: 4500,
		},
		babihutan: {
			money: 3600,
		},
		babi: {
			money: 7200,
		},
		ayam: {
			money: 2700,
		},
		orca: {
			money: 18000,
		},
		paus: {
			money: 40500,
		},
		lumba: {
			money: 4500,
		},
		hiu: {
			money: 4050,
		},
		ikan: {
			money: 2250,
		},
		lele: {
			money: 2700,
		},
		bawal: {
			money: 3150,
		},
		nila: {
			money: 2700,
		},
		kepiting: {
			money: 6300,
		},
		lobster: {
			money: 13500,
		},
		gurita: {
			money: 2700,
		},
		cumi: {
			money: 4500,
		},
		udang: {
			money: 6750,
		},
		mangga: {
			money: 400,
		},
		anggur: {
			money: 300,
		},
		jeruk: {
			money: 450,
		},
		pisang: {
			money: 200,
		},
		apel: {
			money: 300,
		},
		steak: {
			money: 35000,
		},
		sate: {
			money: 45000,
		},
		rendang: {
			money: 31000,
		},
		kornet: {
			money: 27000,
		},
		nugget: {
			money: 32000,
		},
		bluefin: {
			money: 65000,
		},
		seafood: {
			money: 65000,
		},
		sushi: {
			money: 54500,
		},
		moluska: {
			money: 65000,
		},
		squidprawm: {
			money: 60500,
		},
		horse: {
			money: 450000,
		},
		cat: {
			money: 450000,
		},
		fox: {
			money: 450000,
		},
		dog: {
			money: 450000,
		},
		wolf: {
			money: 900000,
		},
		centaur: {
			money: 1350000,
		},
		phoenix: {
			money: 1800000,
		},
		dragon: {
			money: 2700000,
		},
		rumahsakit: {
			money: 1800000,
		},
		restoran: {
			money: 2250000,
		},
		pabrik: {
			money: 900000,
		},
		tambang: {
			money: 1800000,
		},
		pelabuhan: {
			money: 2250000,
		}
	}
}

let handler = async (m, { command, usedPrefix, args, isPrems }) => {
	let user = db.data.users[m.sender]
	const listItems = Object.fromEntries(Object.entries(items[`${somematch(['buy','shop','beli'], command) ? 'buy' : 'sell'}`]).filter(([v]) => v && v in user))
	let info = `Format : *${usedPrefix + command} [item] [jumlah]*\n`
	info += `Contoh : *${usedPrefix}${command} limit 10*\n\n`
	info += `*━━━[ DAILY ITEMS ]━━━*\n%🌌 limit%\n%🥤 potion%\n%🍖 petfood%\n\n`
	info += `*━━━[ CRAFT ITEMS ]━━━*\n`
	info += `%| 🪵 wood	 | 🪨 rock%\n`
	info += `%| 🕸️ string   | ⛓️ iron%\n`
	info += `%| 🪵 sand	 | 💚 emerald%\n`
	info += `%| 💎 diamond  | 👑 gold%\n\n`
	info += `*━━━[ COOKING INGREDIENTS ]━━━*${readMore}\n`
	info += `%| bawang	  | cabai%\n`
	info += `%| kemiri	  | jahe%\n`
	info += `%| saus		| asam%\n\n`
	info += `*━━━[ GARDENING MATERIALS ]━━━*\n`
	info += `%| 🌾 bibitmangga%\n`
	info += `%| 🌾 bibitapel%\n`
	info += `%| 🌾 bibitpisang%\n`
	info += `%| 🌾 bibitjeruk%\n`
	info += `%| 🌾 bibitanggur%\n\n`
	info += `*━━━[ GACHA BOX ]━━━*\n`
	info += `%| 📦 common%\n`
	info += `%| 🎁 uncommon%\n`
	info += `%| 🗳️ mythic%\n`
	info += `%| 🗃️ legendary%\n\n`
	info += `*━━━[ LAND ANIMALS ]━━━*\n`
	info += `%| 🐂 banteng | 🐅 harimau%\n`
	info += `%| 🐘 gajah   | 🐐 kambing%\n`
	info += `%| 🐼 panda   | 🐊 buaya%\n`
	info += `%| 🐃 kerbau  | 🐄 sapi%\n`
	info += `%| 🐒 monyet  | 🐗 babihutan%\n`
	info += `%| 🐖 babi	| 🐔 ayam%\n\n`
	info += `*━━━[ SEA ANIMALS ]━━━*\n`
	info += `%| 🐋 orca	| 🐳 paus%\n`
	info += `%| 🐬 lumba   | 🦈 hiu%\n`
	info += `%| 🐟 ikan	| 🐟 lele%\n`
	info += `%| 🐡 bawal   | 🐠 nila%\n`
	info += `%| 🦀 kepiting| 🦞 lobster%\n`
	info += `%| 🐙 gurita  | 🦑 cumi%\n`
	info += `%| 🦐 udang%\n\n`
	info += `*━━━[ PET SHOP ]━━━*\n`
	info += `%| 🐎 horse   | 🐈 cat%\n`
	info += `%| 🦊 fox	 | 🐕 dog%\n`
	info += `%| 🐺 wolf	| 🐎 centaur%\n`
	info += `%| 🦜 phoenix | 🐉 dragon%\n\n`
	info += `*━━━[ BUILDINGS ]━━━*\n`
	info += `%| 🏥 rumahsakit%\n`
	info += `%| 🏭 restoran%\n`
	info += `%| 🏯 pabrik%\n`
	info += `%| ⚒️ tambang%\n`
	info += `%| 🛳️ pelabuhan%`

	let infos = `Format : *${usedPrefix + command} [item] [jumlah]*\n`
	infos += `Contoh : *${usedPrefix}${command} potion 10*\n\n`
	infos += `*━━━[ DAILY ITEMS ]━━━*\n%🥤 potion%\n%🍖 petfood%\n%🌌 trash%\n\n`
	infos += `*━━━[ SELL ANIMALS ]━━━*\n`
	infos += `%| 🐂 banteng | 🐅 harimau%\n`
	infos += `%| 🐘 gajah   | 🐐 kambing%\n`
	infos += `%| 🐼 panda   | 🐊 buaya%\n`
	infos += `%| 🐃 kerbau  | 🐄 sapi%\n`
	infos += `%| 🐒 monyet  | 🐗 babihutan%\n`
	infos += `%| 🐖 babi	| 🐔 ayam%\n\n`
	infos += `*━━━[ SEA ANIMALS ]━━━*${readMore}\n`
	infos += `%| 🐋 orca	| 🐳 paus%\n`
	infos += `%| 🐬 lumba   | 🦈 hiu%\n`
	infos += `%| 🐟 ikan	| 🐟 lele%\n`
	infos += `%| 🐡 bawal   | 🐠 nila%\n`
	infos += `%| 🦀 kepiting| 🦞 lobster%\n`
	infos += `%| 🐙 gurita  | 🦑 cumi%\n`
	infos += `%| 🦐 udang%\n\n`
	infos += `*━━━[ SELL FRUITS ]━━━*\n`
	infos += `%| 🥭 mangga%\n`
	infos += `%| 🍇 anggur%\n`
	infos += `%| 🍊 jeruk%\n`
	infos += `%| 🍌 pisang%\n`
	infos += `%| 🍎 apel%\n\n`
	infos += `*━━━[ PET SELL ]━━━*\n`
	infos += `%| 🐎 horse   | 🐈 cat%\n`
	infos += `%| 🦊 fox	 | 🐕 dog%\n`
	infos += `%| 🐺 wolf	| 🐎 centaur%\n`
	infos += `%| 🦜 phoenix | 🐉 dragon%\n\n`
	infos += `*━━━[ BUILDINGS ]━━━*\n`
	infos += `%| 🏥 rumahsakit%\n`
	infos += `%| 🏭 restoran%\n`
	infos += `%| 🏯 pabrik%\n`
	infos += `%| ⚒️ tambang%\n`
	infos += `%| 🛳️ pelabuhan%`
	
	const item = (args[0] || '').toLowerCase()
	const total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
	if (!listItems[item] && somematch(['buy','shop','beli'], command)) return m.reply(info.replaceAll('%', '```'))
	if (!listItems[item] && somematch(['sell','jual'], command)) return m.reply(infos.replaceAll('%', '```'))
	let paymentMethod = Object.keys(listItems[item]).find(v => v in user)
	if (somematch(['buy','shop','beli'], command)) {
		if (isPrems && item == 'limit') throw `[!] Premium User tidak perlu limit.`
		if (somematch(['horse', 'cat', 'fox', 'dog', 'wolf', 'centaur', 'phoenix', 'dragon', 'rumahsakit', 'restoran', 'pabrik', 'tambang', 'pelabuhan'], args[0].toLowerCase())) {
			if (user[`${item}`] == 0) {
				if (total > 1) return m.reply(`Kamu belum memiliki *${global.rpg.emoticon(item)}${item}*, hanya dapat beli 1`)
				if (user[paymentMethod] < listItems[item][paymentMethod] * total) return m.reply(`Kamu tidak memiliki cukup ${paymentMethod} untuk membeli *${total} ${global.rpg.emoticon(item)}${item}*.\nKurang *${(listItems[item][paymentMethod] * total) - user[paymentMethod]} ${global.rpg.emoticon(paymentMethod)} ${paymentMethod}* untuk dapat membeli.`)
				user[paymentMethod] -= listItems[item][paymentMethod] * total
				user[item] += total
				user[`${item}lvl`] += 1
				return m.reply(`Membeli *${total} ${global.rpg.emoticon(item)}${item}* seharga *${listItems[item][paymentMethod] * total} ${global.rpg.emoticon(paymentMethod)} ${paymentMethod}*`)
			} else {
				if (user[`${item}`] + total > 2 * user[`${item}lvl`]) return m.reply(`Perlu upgrade ${global.rpg.emoticon(item)} ${item} ke level ${2 * user[`${item}lvl`]} terlebih dahulu.`)
				let harga = listItems[item][paymentMethod] * total * user[`${item}`] * user[`${item}lvl`]
				if (user[paymentMethod] < listItems[item][paymentMethod] * total) return m.reply(`Kamu tidak memiliki cukup ${paymentMethod} untuk membeli *${total} ${global.rpg.emoticon(item)}${item} level ${user[`${item}lvl`]}*.\nKurang *${(listItems[item][paymentMethod] * total) - user[paymentMethod]} ${global.rpg.emoticon(paymentMethod)} ${paymentMethod}* untuk dapat membeli.`)
				user[paymentMethod] -= harga
				user[item] += total
				return m.reply(`Membeli *${total} ${global.rpg.emoticon(item)}${item}* seharga *${harga} ${global.rpg.emoticon(paymentMethod)} ${paymentMethod}*`)
			}
		} else {
			if (user[paymentMethod] < listItems[item][paymentMethod] * total) return m.reply(`Kamu tidak memiliki cukup ${paymentMethod} untuk membeli *${total}* ${global.rpg.emoticon(item)}${item}.\nKurang ${global.rpg.emoticon(paymentMethod)} *${(listItems[item][paymentMethod] * total) - user[paymentMethod]} ${paymentMethod}* untuk dapat membeli.`)
			user[paymentMethod] -= listItems[item][paymentMethod] * total
			user[item] += total
			return m.reply(`Membeli *${total} ${global.rpg.emoticon(item)}${item}* seharga *${listItems[item][paymentMethod] * total} ${global.rpg.emoticon(paymentMethod)} ${paymentMethod}*`)
		}
	} else {
		if (somematch(['horse', 'cat', 'fox', 'dog', 'wolf', 'centaur', 'phoenix', 'dragon', 'rumahsakit', 'restoran', 'pabrik', 'tambang', 'pelabuhan'], args[0].toLowerCase())) {
			let harga = listItems[item][paymentMethod] * total * user[`${item}lvl`]
			if (user[item] == 0) return m.reply(`Kamu tidak memiliki *${global.rpg.emoticon(item)}${item}* untuk dijual.`)
			if (user[item] < total) return m.reply(`Kamu hanya memiliki *${user[item]}${global.rpg.emoticon(item)}${item}* untuk dijual.`)
			user[item] -= total
			user.money += harga
			let meh = user[`${item}lvl`]
			if (user[item] == 0) user[`${item}lvl`] = 0
			return m.reply(`Menjual *${total} ${global.rpg.emoticon(item)}${item} Level ${meh}* dengan harga *${global.rpg.emoticon(paymentMethod)} ${harga} ${paymentMethod}*`)
		} else {
			if (user[item] == 0) return m.reply(`Kamu tidak memiliki *${global.rpg.emoticon(item)}${item}* untuk dijual.`)
			if (user[item] < total) return m.reply(`Kamu hanya memiliki *${user[item]}${global.rpg.emoticon(item)}${item}* untuk dijual.`)
			user[item] -= total
			user.money += listItems[item].money * total
			return m.reply(`Menjual *${total} ${global.rpg.emoticon(item)}${item}* dengan harga *${global.rpg.emoticon(paymentMethod)} ${listItems[item].money * total} ${paymentMethod}*`)
		}
	}
}

handler.menufun = ['buy', 'sell'].map(v => v + ' [item] [count]')
handler.tagsfun = ['rpg']
handler.command = /^(buy|beli|shop|sell|jual)$/i

handler.disabled = false

export default handler