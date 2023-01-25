import fetch from 'node-fetch'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example : ${usedPrefix + command} insulation potion`
	let res = await fetch(`https://api.genshin.dev/consumables/potions`)
	let json = await res.json()
	if (json[`${text.replace(/ /g, '-')}`] != undefined) {
		let anu = json[`${text.replace(/ /g, '-')}`]
		let ini_txt = `*Name : ${anu.name}*\n\n`
		ini_txt += `Rarity : ${anu.rarity}\n`
		ini_txt += `Effect : ${anu.effect}\n\n`
		ini_txt += `*Crafting :*\n`
		for (var x of anu.crafting) {
			ini_txt += `Item : ${x.item}\n`
			ini_txt += `Quantity : ${x.quantity}\n`
			ini_txt += `──────────\n\n`
		}
		await m.reply(ini_txt)
	} else {
		let bruh = Object.keys(json)
		let ini_txt = `*Not Found*\n\n*Available potions is :*\n${bruh.toString().replace(/-/g, ' ').replace(/,/g, ', ')}`
		m.reply(ini_txt)
	}
}

handler.menugenshin = ['gipotion <teks>']
handler.tagsgenshin = ['search']
handler.command = /^(gipotions?)$/i

handler.limit = true

export default handler