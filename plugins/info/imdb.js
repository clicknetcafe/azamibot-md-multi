let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) return m.reply(`Example : ${usedPrefix + command} Avengers`)
	try {
		let anu = await (await fetch(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(text)}`)).json()
		if (anu.error) throw Error()
		let txt = `*${anu.title}*\n\n`
		+ `_${anu.imdburl}_\n\n`
		+ `*Rating :*\n`
		for (let x of anu.ratings) {
			txt += `━ ${x.value} _( ${x.source} )_\n`
		}
		txt += `\n*released :* ${anu.released}\n`
		+ `*rated : ${anu.rated}*\n`
		+ `*runtime :* ${anu.runtime}\n`
		+ `*genres :* ${anu.genres}\n`
		+ `*languages :* ${anu.languages}\n`
		+ `*released :* ${anu.released}\n`
		+ `*director :* ${anu.director}\n`
		+ `*writer :* ${anu.writer}\n`
		+ `*actor :* ${anu.actors}\n\n`
		+ `*plot :*\n_"${anu.plot.trim()}"_`
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