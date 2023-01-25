import { delay } from '../lib/others.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
	await delay(2000)
	try {
		let res = await fetch(`https://api.akuari.my.id/randomtext/katabijak`)
		let json = await res.json()
		if (json.hasil.quotes == undefined) throw new(e)
		conn.sendButton(m.chat, `_${json.hasil.quotes}_\n\n*― ${json.hasil.author}*`, `⭔ Random Quote ⭔`, null, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
	} catch (e) {
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/random/quotes?apikey=${apilol}`)
			let json = await res.json()
			conn.sendButton(m.chat, `_${json.result.quote}_\n\n*― ${json.result.by}*`, `⭔ Random Quote ⭔`, null, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
		} catch (e) {
			console.log(e)
			m.reply(`Terjadi kesalahan, coba lagi nanti.`)
		}
	}
}

handler.help = ['quote']
handler.tags = ['randomtext']
handler.command = /^(quotes?)$/i

handler.premium = true
handler.limit = true

export default handler