import genshindb from 'genshin-db'

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example : ${usedPrefix + command} ganyu`
	try {
		let txt = `*Ascension Cost for ${capitalizeFirstLetter(text)} :*`
		let anu = await genshindb.characters(text).costs
		let z = 1
		for (let x of Object.values(anu)) {
			txt += `\n\n*[ Ascend ${z} ]*\n`
			for (let y in x) {
				txt += `${x[y].name} : ${x[y].count}\n`
			}
			txt += `───────────────────${z == 2 ? `${readMore}` : ''}`
			z += 1
		}
		m.reply(txt.replaceAll('getRandom : undefined\n',''))
	} catch (e) {
		console.log(e)
		let anu2 = await genshindb.characters(`names`, { matchCategories: true })
		m.reply(`*Not Found*\n\n*Available character constellations is :*\n${anu2.join(", ")}`)
	}
}

handler.menugenshin = ['gikonstelasi <character>']
handler.tagsgenshin = ['search']
handler.command = /^((gi|genshin)(cons(tell?ation)?|konstelasi))$/i

handler.limit = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)