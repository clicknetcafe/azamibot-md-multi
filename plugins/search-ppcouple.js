import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let res = await fetch(`https://api.akuari.my.id/randomimage/ppcouple`)
		let json = await res.json()
		let fimg = await fetch(json.hasil.cowok)
		let fimgb = Buffer.from(await fimg.arrayBuffer())
		if (Buffer.byteLength(fimgb) < 22000) throw new e()
		await conn.sendFile(m.chat, fimgb, '', 'male')
		await conn.sendFile(m.chat, json.hasil.cewek, '', 'female')
	} catch (e) {
		let res = await fetch(`https://api.lolhuman.xyz/api/random/ppcouple?apikey=${apilol}`)
		if (!res.ok) return m.reply(`Terjadi kesalahan, coba lagi nanti.`)
		let json = await res.json()
		await conn.sendFile(m.chat, json.result.male, '', 'male')
		await conn.sendFile(m.chat, json.result.female, '', 'female')
	}
}

handler.help = ['ppcouple']
handler.tags = ['searching']
handler.command = /^((pp)?couple|ppcp)$/i

handler.premium = true
handler.limit = true

export default handler