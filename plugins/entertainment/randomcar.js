let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let res = await fetch(`https://api.popcat.xyz/car`)
		let json = await res.json()
		await conn.sendButton(m.chat, '_Random pic : car_\n'+json.title, pauthor, json.image, [[command, usedPrefix+command]], m)
	} catch (e) {
		console.log(e)
		m.reply(`Command ${command} sedang gangguan.`)
	}
}

handler.help = ['car']
handler.tags = ['entertainment']
handler.command = /^((random)?(car|mobil)(random)?)$/i

handler.premium = true
handler.limit = true

export default handler