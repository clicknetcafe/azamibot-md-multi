import { delay, pickRandom } from '../lib/others.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
	await delay(2000)
	try {
		let res = await fetch(`https://raw.githubusercontent.com/clicknetcafe/databasebot/main/Random/dilan.json`)
		let anu = pickRandom(await res.json())
		conn.sendButton(m.chat, anu, `⭔ Dilan Quotes ⭔`, null, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
	} catch (e) {
		console.log(e)
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/quotes/dilan?apikey=${apilol}`)
			let json = await res.json()
			if (json.status != '200') throw new e()
			conn.sendButton(m.chat, `${json.result}`, `⭔ Dilan Quotes ⭔`, null, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
		} catch (e) {
			m.reply(`Terjadi kesalahan, coba lagi nanti.`)
		}
	}
}

handler.help = ['quotedilan']
handler.tags = ['randomtext']
handler.command = /^((quotes?|kata)dilan)$/i

handler.premium = true
handler.limit = true

export default handler