import genshindb from 'genshin-db'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example : *${usedPrefix + command} ballad*`
	try {
		let anu = await genshindb.materials(text)
		let txt = `*Found : ${anu.name}*\n\n`
		txt += `"${anu.description}"\n\n`
		txt += `*Sources :* ${anu.source}\n`
		txt += `${anu.dropdomain ? `*Drop Places :* ${anu.dropdomain}\n` : ''}`
		txt += `${anu.daysofweek ? `*Days :* ${anu.daysofweek.toString().replaceAll(',',', ')}\n\n` : '\n'}`
		txt += `*Sort Order :* ${anu.sortorder}\n`
		txt += `${anu.rarity ? `*Rarity :* ${anu.rarity}\n` : ''}`
		txt += `*Category :* ${anu.category}\n`
		txt += `*Material Type :* ${anu.materialtype}`
		await conn.sendMsg(m.chat, { image: { url: anu.images.redirect }, caption: txt }, { quoted: m })
	} catch (e) {
		console.log(e)
		let anu2 = await genshindb.materials(`names`, { matchCategories: true })
		m.reply(`*Not Found*\n\n*Available materials is :*\n${anu2.join(", ")}`)
	}
}

handler.menugenshin = ['gimaterial <item>']
handler.tagsgenshin = ['search']
handler.command = /^((gi|genshin)(material|mats?))$/i

handler.limit = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)