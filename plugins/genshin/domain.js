import genshindb from 'genshin-db'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example : *${usedPrefix + command} flame*`
	try {
		let anu = await genshindb.domains(text)
		let txt = `*${anu.name}*\n\n`
		txt += `"${anu.description}"\n\n`
		txt += `*Region :* ${anu.region}\n`
		txt += `*Entrance :* ${anu.domainentrance}\n`
		txt += `*Type :* ${anu.domaintype}\n\n`
		txt += `*Unlock Rank : ${anu.unlockrank}*\n`
		txt += `*Recomended Level : ${anu.recommendedlevel}*\n`
		txt += `${anu.recommendedelements ? `*Recomended Element :* ${anu.recommendedelements.toString().replaceAll(',',', ')}\n` : ''}`
		txt += `${anu.daysofweek ? `*Days :* ${anu.daysofweek.toString().replaceAll(',',', ')}\n\n` : '\n'}`
		txt += `${anu.disorder ? `*Disorder :*\n${anu.disorder.toString()}\n\n` : '\n'}`
		txt += `${anu.monsterlist ? `*Monsters :* ${anu.monsterlist.toString().replaceAll(',',', ')}\n` : ''}`
		m.reply(txt)
	} catch (e) {
		console.log(e)
		let anu2 = await genshindb.domains(`names`, { matchCategories: true })
		m.reply(`*Not Found*\n\n*Available domains is :*\n${anu2.join(", ")}`)
	}
}

handler.menugenshin = ['gidomain <place>']
handler.tagsgenshin = ['search']
handler.command = /^((gi|genshin)domains?)$/i

handler.limit = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)