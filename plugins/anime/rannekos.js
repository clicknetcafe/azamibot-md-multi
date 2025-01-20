import axios from 'axios'
import { sticker } from '../../lib/sticker.js'
import { headers } from '../../lib/func.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let anu = await axios.get('https://nekos.best/api/v2/'+command, {
			'Content-Type': 'application/json',
			...headers
		})
		anu = anu.data.results[0]
		if (anu.url.toLowerCase().split('.').pop() == 'gif') {
			let buffer = await sticker(false, anu.url, packname, author)
			await conn.sendFile(m.chat, buffer, '', '', m)
		} else await conn.sendButton(m.chat, `_Random pic: ${command}_\n${anu.anime_name ?? anu.source_url}`, pauthor, anu.url, [[command, usedPrefix+command]], m)
	} catch (e) {
		console.log(e)
		if (e.response?.status == 403) m.reply('user is not allowed to access a requested resource')
		else m.reply(e.message)
	}
}

handler.menuanime = ['baka','bored','facepalm','feed','handshake','husbando','kitsune','laugh','lurk','nod','nope','peck','pout','punch','shoot','shrug','sleep','stare','think','thumbsup','tickle','yawn']
handler.tagsanime = ['randompic']
handler.command = /^(baka|bored|facepalm|feed|handshake|husbando|kitsune|laugh|lurk|nod|nope|peck|pout|punch|shoot|shrug|sleep|stare|think|thumbsup|tickle|yawn)$/i

handler.premium = true
handler.limit = true

export default handler