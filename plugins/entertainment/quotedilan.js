import { delay, pickRandom } from '../../lib/func.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	await delay(2000)
	try {
		let res = await fetch(`https://raw.githubusercontent.com/clicknetcafe/databasebot/main/Random/dilan.json`)
		let anu = pickRandom(await res.json())
		m.reply(anu)
	} catch (e) {
		console.log(e)
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/quotes/dilan?apikey=${api.lol}`)
			let json = await res.json()
			if (json.status != '200') throw new e()
			m.reply(json.result)
		} catch (e) {
			m.reply(`Terjadi kesalahan, coba lagi nanti.`)
		}
	}
}

handler.help = ['quotedilan']
handler.tags = ['entertainment']
handler.command = /^((quotes?|kata)dilan)$/i

handler.premium = true
handler.limit = true

export default handler