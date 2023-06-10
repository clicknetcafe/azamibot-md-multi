import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) return m.reply(`Example : ${usedPrefix + command} Avengers`)
	try {
		let res = await fetch(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(text)}`)
		let anu = await res.json()
		let txt = `*${anu.title}*\n\n`
		txt += `_"${anu.plot}"_\n`
		txt += `_${anu.imdburl}_\n\n`
		txt += `*Rating :*\n`
		for (let x of anu.ratings) {
			txt += `━ ${x.value} _( ${x.source} )_\n`
		}
		txt += `\nReleased : ${anu.released}\n`
		txt += `Rated : *${anu.rated}*\n`
		txt += `Genres : ${anu.genres}\n`
		txt += `Languages : ${anu.languages}\n`
		txt += `Released : ${anu.released}\n`
		txt += `Director : ${anu.director}\n`
		txt += `Writer : ${anu.writer}\n`
		txt += `Actor : ${anu.actors}\n`
		await conn.sendMsg(m.chat, { image: { url: anu.poster }, caption: txt }, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply(`Result not found.`)
	}
}

handler.help = ['imdb <title>']
handler.tags = ['information']
handler.command = /^(film|imdb)$/i

handler.premium = true
handler.limit = true

export default handler