import genshindb from 'genshin-db'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example : *${usedPrefix + command} temptation*`
	try {
		let anu = await genshindb.foods(text)
		let txt = `*Found : ${anu.name}*\n\n`
		txt += `_"${anu.description}"_\n\n`
		txt += `*Rarity : ${anu.rarity}*\n`
		txt += `*Type :* ${anu.foodtype}\n`
		txt += `*Category :* ${anu.foodfilter} ( ${anu.foodcategory} )\n\n`
		txt += `${anu.efect ? `*Effect :*\n${anu.effect}\n\n` : ''}`
		txt += `${anu.suspicious ? `*Suspicious :*\n${anu.suspicious.effect}\n_"${anu.suspicious.description}"_\n\n` : ''}`
		txt += `${anu.normal ? `*Normal :*\n${anu.normal.effect}\n_"${anu.suspicious.description}"_\n\n` : ''}`
		txt += `${anu.delicious ? `*Delicious :*\n${anu.delicious.effect}\n_"${anu.suspicious.description}"_\n\n` : ''}`
		m.reply(txt)
	} catch (e) {
		console.log(e)
		let anu2 = await genshindb.foods(`names`, { matchCategories: true })
		m.reply(`*Not Found*\n\n*Available foods is :*\n${anu2.join(", ")}`)
	}
}

handler.menugenshin = ['gifood <item>']
handler.tagsgenshin = ['search']
handler.command = /^((gi|genshin)foods?)$/i

handler.limit = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)