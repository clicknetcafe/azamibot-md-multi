import { sticker } from '../../lib/sticker.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let anu = await (await fetch(`https://nekos.best/api/v2/${command}`)).json()
		anu = anu.results[0]
		if (!anu.url) throw Error('error : no url')
		if (anu.url.toLowerCase().split('.').pop() == 'gif') {
			let buffer = await sticker(false, anu.url, packname, author)
			await conn.sendFile(m.chat, buffer, '', '', m)
		} else await conn.sendButton(m.chat, `_Random pic: ${command}_\n${anu.anime_name ?? anu.source_url}`, pauthor, anu.url, [[command, usedPrefix+command]], m) 
	} catch (e) {
		console.log(e)
		throw 'Internal server error.'
	}
}

handler.menuanime = ['baka','bite','blush','bored','cry','cuddle','dance','facepalm','feed','handshake','handhold','happy','highfive','hug','husbando','kiss','kitsune','laugh','lurk','neko','nod','nom','nope','pat','peck','poke','pout','punch','shoot','shrug','slap','sleep','smile','smug','stare','think','thumbsup','tickle','wave','wink','yawn','yeet']
handler.tagsanime = ['randompic']
handler.command = /^(baka|bite|blush|bored|cry|cuddle|dance|facepalm|feed|handshake|handhold|happy|highfive|hug|husbando|kiss|kitsune|laugh|lurk|neko|nod|nom|nope|pat|peck|poke|pout|punch|shoot|shrug|slap|sleep|smile|smug|stare|think|thumbsup|tickle|wave|wink|yawn|yeet)$/i

handler.premium = true
handler.limit = true

export default handler