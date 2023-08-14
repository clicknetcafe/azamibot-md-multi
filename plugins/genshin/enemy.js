import genshindb from 'genshin-db'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example : *${usedPrefix + command} slime*`
	try {
		let anu = await genshindb.enemies(text)
		let txt = `*Found : ${anu.name}*\n\n`
		txt += `"${anu.description}"\n\n`
		txt += `*Special Name :* ${anu.specialname}\n`
		txt += `*Type :* ${anu.enemytype}\n`
		txt += `*Category :* ${anu.category}`
		txt += `${anu.investigation ? `\n\n*Investigation :*\n*[ ${anu.investigation.name} - ${anu.investigation.category} ]*\n_${anu.investigation.description}_` : ''}`
		m.reply(txt)
	} catch (e) {
		console.log(e)
		let anu2 = await genshindb.enemies(`names`, { matchCategories: true })
		m.reply(`*Not Found*\n\n*Available enemies is :*\n${anu2.join(", ")}`)
	}
}

handler.menugenshin = ['gienemy <place>']
handler.tagsgenshin = ['search']
handler.command = /^((gi|genshin)enem(y|ies?))$/i

handler.limit = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)