import genshindb from 'genshin-db'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example : *${usedPrefix + command} ganyu*`
	try {
		let anu = await genshindb.talents(text)
		let txt = `*${anu.name} Talents* [ v${anu.version} ]\n\n`
		txt += `*Combat 1 : ${anu.combat1.name}*\n`
		txt += `*${anu.combat1.info}*\n\n`
		txt += `*Combat 2 : ${anu.combat2.name}* ${readMore}\n`
		txt += `*${anu.combat2.info}*`
		txt += `${anu.combat3.name ? `\n\n*Combat 3 : ${anu.combat3.name}*\n` : ''}`
		txt += `${anu.combat3.info ? `*${anu.combat3.info}*` : ''}`
		txt += `\n───────────────────\n\n`
		txt += `*Passive 1 : ${anu.passive1.name}*\n`
		txt += `*${anu.passive1.info}*\n\n`
		txt += `*Passive 2 : ${anu.passive2.name}*\n`
		txt += `*${anu.passive2.info}*`
		txt += `${anu.passive3.name ? `\n\n*Passive 3 : ${anu.passive3.name}*\n` : ''}`
		txt += `${anu.passive3.info ? `*${anu.passive3.info}*` : ''}`
		m.reply(txt.replaceAll('***','*').replaceAll('**','*'))
	} catch (e) {
		console.log(e)
		let anu2 = await genshindb.talents(`names`, { matchCategories: true })
		m.reply(`*Not Found*\n\n*Available talents is :*\n${anu2.join(", ")}`)
	}
}

handler.menugenshin = ['gitalent <character>']
handler.tagsgenshin = ['search']
handler.command = /^((gi|genshin)talent)$/i

handler.limit = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)