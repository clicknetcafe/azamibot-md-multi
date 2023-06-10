import fetch from 'node-fetch'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
	try {
		let res = await fetch(`https://api.lolhuman.xyz/api/neonimelatest?apikey=${apilol}`)
		let get_result = await res.json()
		let txt = `*Latest Anime :*`
		for (let x of get_result.result) {
			txt += `\n\n*${x.title}*\n`
			txt += `Episode : ${x.episode}\n`
			txt += `Date : ${x.episode}\n`
			txt += `Link : ${x.link}\n\n`
			txt += `_"${x.desc}"_\n`
			txt += `───────────────────`
		}
		await conn.sendMsg(m.chat, { image: { url: get_result.result[0].thumbnail }, caption: txt }, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply(`Tidak ditemukan hasil.`)
	}
}

handler.menuanime = ['neonimelatest']
handler.tagsanime = ['search']
handler.command = /^(neonime( latest|latest)?)$/i

handler.premium = true
handler.limit = true

export default handler