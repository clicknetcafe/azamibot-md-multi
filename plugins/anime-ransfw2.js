import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	try {
		let fimg = await fetch(`https://api.lolhuman.xyz/api/random/${command}?apikey=${global.api}`)
		if (!fimg.ok) throw new e()
		let fimgb = Buffer.from(await fimg.arrayBuffer())
		conn.sendButton(m.chat, `_Random pic: ${command}_`, packname + ' - ' + author, fimgb, [[`⧑ next ${command} ⧑`, `${usedPrefix + command} ${text}`]], m)
	} catch (e) {
		m.reply(`Terjadi kesalahan, coba lagi nanti`)
	}
}

handler.menuanime = ['elf','shota','husbu','sagiri','elaina','kanna','wallnime']
handler.tagsanime = ['randompic']
handler.command = /^(elf|shota|husbu|sagiri|elaina|kanna|wallnime)$/i

handler.premium = true
handler.limit = true

export default handler