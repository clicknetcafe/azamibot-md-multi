let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let anu = await fetch(`https://candaan-api.vercel.app/api/image`)
			let json = await anu.json()
			let fimg = await fetch(json.data[Math.floor(Math.random() * json.data.length)].url)
			let fimgb = Buffer.from(await fimg.arrayBuffer())
			if (Buffer.byteLength(fimgb) < 22000) throw Error()
			await conn.sendMsg(m.chat, { image: fimgb, caption: `_© meme receh_` }, { quoted: m })
	} catch (e) {
		try {
			let anu = await fetch(`https://candaan-api.vercel.app/api/image/random`)
			let json = await anu.json()
			let fimg = await fetch(json.data.url)
			let fimgb = Buffer.from(await fimg.arrayBuffer())
			if (Buffer.byteLength(fimgb) < 22000) throw Error()
			await conn.sendButton(m.chat, `_© meme receh_`, pauthor, fimgb, [[command, usedPrefix+command]], m)
		} catch (e) {
			try {
				let fimg = await fetch(`https://api.lolhuman.xyz/api/meme/memeindo?apikey=${api.lol}`)
				let fimgb = Buffer.from(await fimg.arrayBuffer())
				if (Buffer.byteLength(fimgb) < 22000) throw Error()
				await conn.sendButton(m.chat, `_© meme receh_`, pauthor, fimgb, [[command, usedPrefix+command]], m)
			} catch (e) {
				m.reply(`Terjadi kesalahan, coba lagi nanti.`)
			}
		}
	}
}

handler.help = ['meme']
handler.tags = ['entertainment']
handler.command = /^((random)?meme)$/i

handler.premium = true
handler.limit = true

export default handler