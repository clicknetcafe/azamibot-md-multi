import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
	await delay(2000)
	try {
		let res = await fetch(`https://api.lolhuman.xyz/api/quotes/dilan?apikey=${global.api}`)
		let json = await res.json()
		conn.sendButton(m.chat, `${json.result}`, `⭔ Dilan Quotes ⭔`, null, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan, coba lagi nanti.`)
	}
}

handler.help = ['quotedilan']
handler.tags = ['randomtext']
handler.command = /^(quotes?dilan)$/i

handler.premium = true
handler.limit = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))