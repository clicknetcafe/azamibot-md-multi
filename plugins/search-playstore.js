import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) return m.reply(`Example: *${usedPrefix + command} wps office*`)
	try {
		let gplay = require('google-play-scraper');
		let json = await gplay.search({ term: `${text}` })
		if (json.length == 0) return m.reply(`No Result Found.`)
		let ini_txt = `Result : ${text}`
		for (let x of json) {
			ini_txt += `\n\n*${x.title}*\n`
			ini_txt += `Package : ${x.appId}\n`
			ini_txt += `Developer : _${x.developer}_\n`
			ini_txt += `_${x.url}_\n`
			ini_txt += `Rating : ⭐ *${x.scoreText}*\n`
			ini_txt += `───────────────────`
		}
		m.reply(ini_txt)
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