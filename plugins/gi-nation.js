import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example : ${usedPrefix + command} liyue`
	let res = await fetch(`https://api.genshin.dev/nations/${encodeURIComponent(text)}`)
	let res2 = await fetch(`https://api.genshin.dev/nations`)
	let json = await res.json()
	let json2 = await res2.json()
	if (json.name != undefined) {
		let ini_txt = `*Name : ${json.name}*\n\n`
		ini_txt += `*Element :* ${json.element}\n`
		ini_txt += `*Archon :* ${json.element}\n`
		ini_txt += `*ControllingEntity : ${json.controllingEntity}*`
		await m.reply(ini_txt)
	} else {
		let ini_txt = `*Not Found*\n\n*Available nations is :*\n${json2.join(", ")}`
		m.reply(ini_txt)
	}
}

handler.menugenshin = ['gination <teks>']
handler.tagsgenshin = ['search']
handler.command = /^((gi|genshin)nations?)$/i

handler.limit = true

export default handler