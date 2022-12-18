import genshindb from 'genshin-db'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example : *${usedPrefix + command} klee*`
	try {
		let anu = await genshindb.namecards(text)
		let ini_txt = `*${anu.name}*\n\n`
		ini_txt += `*[ ${anu.description.replace('\n',' ]*\n_"')}"_\n\n`
		ini_txt += `${anu.source ? `*Source :* ${anu.source.toString().replaceAll(',',', ')}` : ''}`
		m.reply(ini_txt)
	} catch (e) {
		console.log(e)
		let anu2 = await genshindb.namecards(`names`, { matchCategories: true })
		m.reply(`*Not Found*\n\n*Available namecards is :*\n${anu2.join(", ")}`)
	}
}

handler.menugenshin = ['ginamecard <item>']
handler.tagsgenshin = ['search']
handler.command = /^((gi|genshin)(name)?cards?)$/i

handler.limit = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)