let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example : ${usedPrefix + command} liyue`
	let res = await fetch(`https://api.genshin.dev/nations/${encodeURIComponent(text)}`)
	let res2 = await fetch(`https://api.genshin.dev/nations`)
	let json = await res.json()
	let json2 = await res2.json()
	if (json.name != undefined) {
		let txt = `*Name : ${json.name}*\n\n`
		txt += `*Element :* ${json.element}\n`
		txt += `*Archon :* ${json.element}\n`
		txt += `*ControllingEntity : ${json.controllingEntity}*`
		await m.reply(txt)
	} else {
		let txt = `*Not Found*\n\n*Available nations is :*\n${json2.join(", ")}`
		m.reply(txt)
	}
}

handler.menugenshin = ['gination <teks>']
handler.tagsgenshin = ['search']
handler.command = /^((gi|genshin)nations?)$/i

handler.limit = true

export default handler