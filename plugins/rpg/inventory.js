import db from '../../lib/database.js'
import daily from './daily.js'
import weekly from './weekly.js'
import monthly from './monthly.js'
import adventure from './adventure.js'

const inventory = {
	others: {
		health: true,
		money: true,
		exp: true,
	},
	items: {
		potion: true,
		petfood: true,
		wood: true,
		rock: true,
		string: true,
		iron: true,
		trash: true,
		emerald: true,
		diamond: true,
		gold: true,
	},
	builds: {
		rumahsakit: true,
		restoran: true,
		pabrik: true,
		tambang: true,
		pelabuhan: true,
	},
	crates: {
		common: true,
		uncommon: true,
		mythic: true,
		legendary: true,
	},
	pets: {
		horse: true,
		cat: true,
		fox: true,
		dog: true,
		wolf: true,
		centaur: true,
		phoenix: true,
		dragon: true,
	},
	cooks: {
		steak: true,
		sate: true,
		rendang: true,
		kornet: true,
		nugget: true,
		bluefin: true,
		seafood: true,
		sushi: true,
		moluska: true,
		squidprawm: true,
	},
	fruits: {
		mangga: true,
		apel: true,
		pisang: true,
		jeruk: true,
	},
	cooldowns: {
		lastclaim: {
			name: 'claim',
			time: daily.cooldown
		},
		lastweekly: {
			name: 'weekly',
			time: weekly.cooldown
		},
		lastmonthly: {
			name: 'monthly',
			time: monthly.cooldown
		},
		lastadventure: {
			name: 'adventure',
			time: adventure.cooldown
		}
	}
}

let handler = async (m, { conn }) => {
	let user = db.data.users[m.sender]
	const others = Object.keys(inventory.others).map(v => user[v] && `*${global.rpg.emoticon(v)} ${v} :* ${user[v]}`).filter(v => v).join('\n').trim()
	const items = Object.keys(inventory.items).map(v => user[v] && `*${global.rpg.emoticon(v)} ${v} :* ${user[v]}`).filter(v => v).join('\n').trim()
	const builds = Object.keys(inventory.builds).map(v => user[v] && `*${global.rpg.emoticon(v)} ${v} :* ${user[v]} ( level ${user[`${v}lvl`]} )`).filter(v => v).join('\n').trim()
	const crates = Object.keys(inventory.crates).map(v => user[v] && `*${global.rpg.emoticon(v)} ${v} :* ${user[v]}`).filter(v => v).join('\n').trim()
	const pets = Object.keys(inventory.pets).map(v => user[v] && `*${global.rpg.emoticon(v)} ${v} :* ${user[v]} ( level ${user[`${v}lvl`]} )`).filter(v => v).join('\n').trim()
	const cooks = Object.keys(inventory.cooks).map(v => user[v] && `*${global.rpg.emoticon(v)} ${v} :* ${user[v]}`).filter(v => v).join('\n').trim()
	const fruits = Object.keys(inventory.fruits).map(v => user[v] && `*${global.rpg.emoticon(v)} ${v} :* ${user[v]}`).filter(v => v).join('\n').trim()
	const cooldowns = Object.entries(inventory.cooldowns).map(([cd, { name, time }]) => cd in user && `*⌛${name}* : ${new Date() - user[cd] >= time ? '✅' : '❌'}`).filter(v => v).join('\n').trim()
	const caption = `
Inventory *${conn.getName(m.sender)}*

${Object.keys(inventory.others).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${user[v]}`).filter(v => v).join('\n')}${items ? `

*📍 Items*
${items}
*🎒 Total Items :* ${Object.keys(inventory.items).map(v => user[v]).reduce((a, b) => a + b, 0)} Items${readMore}` : ''}${builds ? `

*📍 Building*
${builds}
*🏗️ Total Buldings :* ${Object.keys(inventory.builds).map(v => user[v]).reduce((a, b) => a + b, 0)} Buildings` : ''}${crates ? `

*📍 Crates*
${crates}
*⚗️ Total Crates :* ${Object.keys(inventory.crates).map(v => user[v]).reduce((a, b) => a + b, 0)} Boxs` : ''}${pets ? `

*📍 Pets*
${pets}
*🪸 Total Pets :* ${Object.keys(inventory.pets).map(v => user[v]).reduce((a, b) => a + b, 0)} Pets` : ''}${cooks ? `

*📍 Foods*
${cooks}
*🥡 Total Foods :* ${Object.keys(inventory.cooks).map(v => user[v]).reduce((a, b) => a + b, 0)} Dish` : ''}${fruits ? `

*📍 Fruits*
${fruits}
*🫐 Total Fruits :* ${Object.keys(inventory.fruits).map(v => user[v]).reduce((a, b) => a + b, 0)} Fruits` : ''}${cooldowns ? `

*⌚ Cooldowns*
${cooldowns}` : ''}
`.trim()
	m.reply(caption)
}

handler.menufun = ['inventory', 'inv']
handler.tagsfun = ['rpg']
handler.command = /^(inv(entory)?|bal(ance)?|money|e?xp)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)