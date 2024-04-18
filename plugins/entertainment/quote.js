import { delay } from '../../lib/func.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	await delay(2000)
	try {
		let res = await fetch(`https://rest-api.akuari.my.id/randomtext/katabijak`)
		let json = await res.json()
		if (json.hasil.quotes == undefined) throw new(e)
		m.reply(`_${json.hasil.quotes}_\n\n*― ${json.hasil.author}*`)
	} catch (e) {
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/random/quotes?apikey=${api.lol}`)
			let json = await res.json()
			m.reply(`_${json.result.quote}_\n\n*― ${json.result.by}*`)
		} catch (e) {
			console.log(e)
			m.reply(`Terjadi kesalahan, coba lagi nanti.`)
		}
	}
}

handler.help = ['quote']
handler.tags = ['entertainment']
handler.command = /^(quotes?)$/i

handler.premium = true
handler.limit = true

export default handler