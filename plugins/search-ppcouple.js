import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let res = await fetch(`https://api.akuari.my.id/randomimage/ppcouple`)
		let json = await res.json()
		let fimg = await fetch(json.hasil.cowok)
		let fimgb = Buffer.from(await fimg.arrayBuffer())
		if (Buffer.byteLength(fimgb) < 22000) throw new e()
		await conn.sendMessage(m.chat, { image: fimgb, caption: `male` })
		await conn.sendMessage(m.chat, { image: { url: json.hasil.cewek }, caption: `female` })
	} catch (e) {
		let res = await fetch(`https://api.lolhuman.xyz/api/random/ppcouple?apikey=${apilol}`)
		if (!res.ok) return m.reply(`Terjadi kesalahan, coba lagi nanti.`)
		let json = await res.json()
		await conn.sendMessage(m.chat, { image: { url: json.result.male }, caption: `male` })
		await conn.sendMessage(m.chat, { image: { url: json.result.female }, caption: `female` })
	}
}

handler.help = ['ppcouple']
handler.tags = ['searching']
handler.command = /^((pp)?couple|ppcp)$/i

handler.premium = true
handler.limit = true

export default handler