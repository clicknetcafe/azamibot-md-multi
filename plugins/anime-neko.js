import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let res = await fetch(`https://api.waifu.pics/sfw/${command}`)
		let json = await res.json()
		if (!json.url) throw new e()
		conn.sendButton(m.chat, `_Random pic : ${command}_`, packname + ' - ' + author, json.url, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
	} catch (e) {
		m.reply('Terjadi kesalahan, coba lagi nanti.')
	}
}

handler.menuanime = ['neko']
handler.tagsanime = ['randompic']
handler.command = /^(neko)$/i

export default handler