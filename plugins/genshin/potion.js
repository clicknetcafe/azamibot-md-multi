let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example : ${usedPrefix + command} insulation potion`
	try {
		text = text.replace(/ /g, '-')
		let anu = await (await fetch(`https://genshin.jmp.blue/consumables/potions`)).json()
		if (anu[text]) {
			anu = anu[text]
			let txt = `*Name : ${anu.name}*\n\n`
			+ `Rarity : ${anu.rarity}\n`
			+ `Effect : ${anu.effect}\n\n`
			+ `*Crafting :*`
			for (var x of anu.crafting) {
				txt += `\nItem : ${x.item}\n`
				+ `Quantity : ${x.quantity}\n`
				+ `──────────\n`
			}
			await m.reply(txt)
		} else {
			let bruh = Object.keys(anu)
			let txt = `*Not Found*\n\n*Available potions is :*\n${bruh.join(', ').replace(/-/g, ' ')}`
			m.reply(txt)
		}
	} catch (e) {
		console.log(e)
		m.reply(e.message)
	}
}

handler.menugenshin = ['gipotion <teks>']
handler.tagsgenshin = ['search']
handler.command = /^(gipotions?)$/i

handler.limit = true

export default handler