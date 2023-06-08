import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let res = await fetch(`https://random-d.uk/api/random`)
		let json = await res.json()
		await conn.sendMsg(m.chat, { image: { url: json.url }, caption: `_Random pic : duck_` }, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply(`Command ${command} sedang gangguan.`)
	}
}

handler.help = ['duck']
handler.tags = ['entertainment']
handler.command = /^((random)?(duck|bebek)(random)?)$/i

handler.premium = true
handler.limit = true

export default handler