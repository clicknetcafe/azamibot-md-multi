let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let res = await fetch(`https://api.popcat.xyz/car`)
		let json = await res.json()
		await conn.sendMsg(m.chat, { image: { url: json.image }, caption: `_Random pic : car_\n${json.title}` }, { quoted: m })
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