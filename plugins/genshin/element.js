let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example : ${usedPrefix + command} anemo`
	let res = await fetch(`https://api.genshin.dev/elements/${encodeURIComponent(text)}`)
	let res2 = await fetch(`https://api.genshin.dev/elements`)
	let json = await res.json()
	let json2 = await res2.json()
	if (json.name != undefined) {
		let txt = `*Name : ${json.name}*\n`
		txt += `*Key :* ${json.key}`
		for (let x of json.reactions) {
			txt += `\n\n*Reaction Name : ${x.name}*\n`
			txt += `*Elements* : `
			for (let y of x.elements) {
				txt += ` ${y}, `
			}
			txt += `\n*Description :*\n${x.description}\n`
			txt += `───────────────────`
		}
		await m.reply(txt)
	} else {
		let txt = `*Not Found*\n\n*Available element is :*\n${json2.join(", ")}`
		m.reply(txt)
	}
}

handler.menugenshin = ['gielement <teks>']
handler.tagsgenshin = ['search']
handler.command = /^gielements?$/i

handler.limit = true

export default handler