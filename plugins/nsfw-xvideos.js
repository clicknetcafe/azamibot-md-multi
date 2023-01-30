import db from '../lib/database.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (m.isGroup && !db.data.chats[m.chat].nsfw) throw `[ *NSFW GAK AKTIF* ]`
	if (!text) throw `Just type query what u need :\nUsage : *${usedPrefix + command} step mother*`
	if (text.includes('http://') || text.includes('https://')) return m.reply(`Only accept query, not url.`)
	try {
		let res = await fetch(`https://azami-api.herokuapp.com/api/search/xvideos?query=${encodeURIComponent(text)}&apikey=${global.bb}`)
		let json = await res.json()
		let get_result = json.result
		let ini_txt = `Found : *${text}*`
		for (var x of get_result) {
			ini_txt += `\n\n*${x.title}*\n`
			ini_txt += `"${x.info}"\n`
			ini_txt += `_${x.link}_\n`
			ini_txt += `───────────────────`
		}
		m.reply(ini_txt)
	} catch (e) {
		console.log(e)
		m.reply(`No Result Found.`)
	}
}

handler.menunsfw = ['xvideos <query>']
handler.tagsnsfw = ['search']
handler.command = /^(xvideos?(web|search)?)$/i

handler.premium = true
handler.limit = true

export default handler