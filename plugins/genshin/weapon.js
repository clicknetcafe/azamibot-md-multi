import genshindb from 'genshin-db'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example : *${usedPrefix + command} skyward*`
	try {
		let anu = await genshindb.weapons(text)
		let txt = `*Found : ${anu.name}*\n\n`
		txt += `_"${anu.description}"_\n\n`
		txt += `*Type :* ${anu.weapontype}\n`
		txt += `*Rarity : ${anu.rarity}*\n`
		txt += `*Base Attack :* ${anu.baseatk}\n`
		txt += `*Sub Stat :* ${anu.substat}\n`
		txt += `*sub value :* ${anu.subvalue}\n`
		txt += `*Effect Name :* ${anu.effectname}\n\n`
		txt += `*Effect :* ${anu.effect}\n`
		txt += `${anu.r1 ? `*r1 :* ${anu.r1.toString().replaceAll(',',', ')}\n` : ''}`
		txt += `${anu.r2 ? `*r2 :* ${anu.r2.toString().replaceAll(',',', ')}\n` : ''}`
		txt += `${anu.r3 ? `*r3 :* ${anu.r3.toString().replaceAll(',',', ')}\n` : ''}`
		txt += `${anu.r4 ? `*r4 :* ${anu.r4.toString().replaceAll(',',', ')}\n` : ''}`
		txt += `${anu.r5 ? `*r5 :* ${anu.r5.toString().replaceAll(',',', ')}\n` : ''}`
		txt += `*Weapon Material Type :* ${anu.weaponmaterialtype}`
		await conn.sendMsg(m.chat, { image: { url: anu.images.awakenicon }, caption: txt }, { quoted: m })
	} catch (e) {
		console.log(e)
		let anu2 = await genshindb.weapons(`names`, { matchCategories: true })
		m.reply(`*Not Found*\n\n*Available weapons is :*\n${anu2.join(", ")}`)
	}
}

handler.menugenshin = ['giweapon <item>']
handler.tagsgenshin = ['search']
handler.command = /^((gi|genshin)weap(ons?)?)$/i

handler.limit = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)