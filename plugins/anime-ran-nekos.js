import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let res = await fetch(`https://nekos.best/api/v2/${command.toLowerCase()}`)
		let anu = await res.json()
		anu = anu.results[0].url
		if (!anu) throw Error('error : no url')
		if (anu.split('.').pop() == 'gif') {
			let buffer = await sticker(false, anu, packname, author)
			await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
		} else await conn.sendButton(m.chat, `_Random pic : ${command}_`, pauthor, anu, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
	} catch (e) {
		console.log(e)
		m.reply('server down')
	}
}

handler.menuanime = ['baka','facepalm','feed','husbando','nod','nope','tickle']
handler.tagsanime = ['randompic']
handler.command = /^(baka|facepalm|feed|husbando|nod|nope|tickle)$/i

handler.premium = true
handler.limit = true

export default handler