import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
	await delay(2000)
	try {
		let fimg = await fetch(`https://api.lolhuman.xyz/api/random/quotesimage?apikey=${global.api}`)
		let fimgb = Buffer.from(await fimg.arrayBuffer())
		if (Buffer.byteLength(fimgb) < 22000) throw new e()
		conn.sendButton(m.chat, `_© Quote untuk Anda_`, packname + ' - ' + author, fimgb, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan, coba lagi nanti.`)
	}
}

handler.help = ['quoteimage']
handler.tags = ['randomtext']
handler.command = /^(quotes?image)$/i

handler.premium = true
handler.limit = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))