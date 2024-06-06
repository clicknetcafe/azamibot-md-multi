import { pickRandom } from '../../lib/func.js'
import { sticker } from '../../lib/sticker.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let res = await fetch(`https://raw.githubusercontent.com/clicknetcafe/Databasee/main/nsfw/${command.replace('manga2nsfw','manga').replace('nekonimensfw','nekonime')}.json`)
		let anu = pickRandom(await res.json())
		if (!anu) throw Error('error : no url')
		if (anu.split('.').pop() == 'gif') {
			let buffer = await sticker(false, anu, packname, author)
			await conn.sendFile(m.chat, buffer, '', '', m)
		} else await conn.sendButton(m.chat, `_Random pic : ${command}_`, pauthor, anu, [[command, usedPrefix+command]], m)
	} catch (e) {
		console.log(e)
		m.reply('scrape failed')
	}
}

handler.menunsfw = ['eba','foot','gifs','jahy','manga2nsfw','neko2','nekonimensfw','nsfwloli','nsfwmanga','nsfwneko','panties','zettai']
handler.tagsnsfw = ['randompic']
handler.command = /^(eba|foot|gifs|jahy|manga2nsfw|neko2|nekonimensfw|nsfwloli|nsfwmanga|nsfwneko|panties|zettai)$/i

handler.premium = true
handler.limit = true
handler.nsfw = true

export default handler