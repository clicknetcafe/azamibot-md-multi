let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example : ${usedPrefix + command} liyue`
	try {
		let json = await (await fetch(`https://genshin.jmp.blue/nations/${text}`)).json()
		let json2 = await(await fetch(`https://genshin.jmp.blue/nations`)).json()
		if (json.name) {
			let txt = `*Name : ${json.name}*\n\n`
			txt += `*Element :* ${json.element}\n`
			txt += `*Archon :* ${json.element}\n`
			txt += `*ControllingEntity : ${json.controllingEntity}*`
			await m.reply(txt)
		} else {
			let txt = `*Not Found*\n\n*Available nations is :*\n${json2.join(", ")}`
			m.reply(txt)
		}
	} catch (e) {
		console.log(e)
		m.reply(e.message)
	}
}

handler.menugenshin = ['gination <teks>']
handler.tagsgenshin = ['search']
handler.command = /^((gi|genshin)nations?)$/i

handler.limit = true

export default handler