import gplay from 'google-play-scraper'

let handler = async (m, { conn, command, text, usedPrefix }) => {
	if (!text) return m.reply(`Example: *${usedPrefix + command} wps office*`)
	try {
		let anu = await gplay.search({ term: `${text}` })
		if (anu.length == 0) return m.reply(`No Result Found.`)
		let txt = `Result : ${text}`
		for (let x of anu) {
			txt += `\n\n*${x.title}*\n`
			txt += `Package : ${x.appId}\n`
			txt += `Developer : _${x.developer}_\n`
			txt += `_${x.url}_\n`
			txt += `Rating : ⭐ *${x.scoreText}*\n`
			txt += `───────────────────`
		}
		m.reply(txt)
	} catch (e) {
		console.log(e)
		m.reply(`No Result Found.`)
	}
}

handler.help = ['playstore'].map(v => v + ' <query>')
handler.tags = ['searching']
handler.command = /^(playstore|apk)$/i

handler.premium = true
handler.limit = true

export default handler