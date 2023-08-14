import genshindb from 'genshin-db'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example : *${usedPrefix + command} flame*`
	try {
		let anu = await genshindb.artifacts(text)
		let txt = `*Found : ${anu.name}*\n\n`
		txt += `${anu[`2pc`] ? `*2pc :* ${anu[`2pc`]}\n` : ''}`
		txt += `${anu[`4pc`] ? `*4pc :* ${anu[`4pc`]}\n\n` : '\n'}`
		txt += `*Flower :*\n`
		txt += `*${anu.flower.name} - ${anu.flower.relictype}*\n_"${anu.flower.description}"_${readMore}\n\n`
		txt += `*Plume :*\n`
		txt += `*${anu.plume.name} - ${anu.plume.relictype}*\n_"${anu.plume.description}"_\n\n`
		txt += `*Sands :*\n`
		txt += `*${anu.sands.name} - ${anu.sands.relictype}*\n_"${anu.sands.description}"_\n\n`
		txt += `*Goblet :*\n`
		txt += `*${anu.goblet.name} - ${anu.goblet.relictype}*\n_"${anu.goblet.description}"_\n\n`
		txt += `*Circlet :*\n`
		txt += `*${anu.circlet.name} - ${anu.circlet.relictype}*\n_"${anu.circlet.description}"_`
		let pick = ['flower','plume','sands','goblet','circlet']
		await conn.sendMsg(m.chat, { image: { url: anu.images[pick.getRandom()] }, caption: txt }, { quoted: m })
	} catch (e) {
		console.log(e)
		let anu2 = await genshindb.artifacts(`names`, { matchCategories: true })
		m.reply(`*Not Found*\n\n*Available artifacts is :*\n${anu2.join(", ")}`)
	}
}

handler.menugenshin = ['giartifact <item>']
handler.tagsgenshin = ['search']
handler.command = /^((gi|genshin)art(i|e)(fa(k|cts?))?)$/i

handler.limit = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)