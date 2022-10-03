import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
	await delay(2000)
	try {
		let res = await fetch(`https://api.lolhuman.xyz/api/random/nama?apikey=${global.api}`)
		let json = await res.json()
		m.reply(json.result)
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan, coba lagi nanti.`)
	}
}

handler.help = ['randomnama']
handler.tags = ['randomtext']
handler.command = /^randomnama$/i

handler.limit = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))