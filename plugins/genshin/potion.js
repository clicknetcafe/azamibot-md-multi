let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example : ${usedPrefix + command} insulation potion`
	let res = await fetch(`https://api.genshin.dev/consumables/potions`)
	let json = await res.json()
	if (json[`${text.replace(/ /g, '-')}`] != undefined) {
		let anu = json[`${text.replace(/ /g, '-')}`]
		let txt = `*Name : ${anu.name}*\n\n`
		txt += `Rarity : ${anu.rarity}\n`
		txt += `Effect : ${anu.effect}\n\n`
		txt += `*Crafting :*\n`
		for (var x of anu.crafting) {
			txt += `Item : ${x.item}\n`
			txt += `Quantity : ${x.quantity}\n`
			txt += `──────────\n\n`
		}
		await m.reply(txt)
	} else {
		let bruh = Object.keys(json)
		let txt = `*Not Found*\n\n*Available potions is :*\n${bruh.toString().replace(/-/g, ' ').replace(/,/g, ', ')}`
		m.reply(txt)
	}
}

handler.menugenshin = ['gipotion <teks>']
handler.tagsgenshin = ['search']
handler.command = /^(gipotions?)$/i

handler.limit = true

export default handler