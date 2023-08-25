import genshindb from 'genshin-db'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example : ${usedPrefix + command} Kokomi`
	let cv, name
	try {
		let anu = await genshindb.characters(text)
		name = anu.name.toLowerCase()
		let txt = `_"${anu.description}"_\n\n`
			+ `*${anu.name}* [ v${anu.version} ]\n\n`
			+ `*Title :* ${anu.title}\n`
			+ `*Element :* ${anu.element}\n`
			+ `*Weapon :* [ ${anu.weapontype} ]\n`
			+ `*Substat :* ${anu.substat}\n`
			+ `*Rarity :* ${anu.rarity > 4 ? '🌟' : '⭐'} *${anu.rarity}*\n\n`
			+ `*Gender :* ${anu.gender} _( ${anu.body} )_\n`
			+ `*Birthday :* ${anu.birthday}\n`
			+ `*Constellation :* ${anu.constellation}\n`
			+ `*Association :* ${anu.association}\n`
			+ `*Region :* ${anu.region}\n`
			+ `*Affiliation :* ${anu.affiliation}`
		await conn.sendMsg(m.chat, { image: { url: anu.images.cover1 }, caption: txt }, { quoted: m })
		try {
			let anu3 = await fetch(`https://api.lolhuman.xyz/api/genshin/${name}?apikey=${api.lol}`)
			cv = await anu3.json()
			cv = cv.result.cv
			if (cv) {
				for (let x of cv) {
					await conn.sendMsg(m.chat, { audio: { url: x.audio.getRandom() }, mimetype: 'audio/mpeg', ptt: true }, { quoted: m })
				}
			} else conn.reply(m.chat, `*Audio not available.*`)
		} catch (e) { console.log(e) }
	} catch (e) {
		console.log(e)
		let anu2 = await genshindb.characters(`names`, { matchCategories: true })
		m.reply(`*Not Found*\n\n*Available characters is :*\n${anu2.join(", ")}`)
	}
}

handler.menugenshin = ['gi <Character>']
handler.tagsgenshin = ['search']
handler.command = /^((gi|genshin)(chara)?)$/i

handler.limit = true

export default handler