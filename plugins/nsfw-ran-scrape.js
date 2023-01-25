import db from '../lib/database.js'
import fetch from 'node-fetch'
import { pickRandom } from '../lib/others.js'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	let chat = db.data.chats[m.chat]
	if (!chat.nsfw && m.isGroup) throw `[ *NSFW GAK AKTIF* ]`
	try {
		let res = await fetch(`https://raw.githubusercontent.com/clicknetcafe/Databasee/main/nsfw/${command.toLowerCase().replace('manga2nsfw','manga').replace('nekonimensfw','nekonime')}.json`)
		let anu = pickRandom(await res.json())
		if (!anu) throw Error('error : no url')
		if (anu.split('.').pop() == 'gif') {
			let buffer = await sticker(false, anu, packname, author)
			await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
		} else await conn.sendButton(m.chat, `_Random pic : ${command}_`, pauthor, anu, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
	} catch (e) {
		console.log(e)
		m.reply('scrape failed')
	}
}

handler.menunsfw = ['eba','foot','gifs','hentaivid','jahy','manga2nsfw','neko2','nekonimensfw','nsfwloli','nsfwmanga','nsfwneko','panties','zettai']
handler.tagsnsfw = ['randompic']
handler.command = /^(eba|foot|gifs|hentaivid|jahy|manga2nsfw|neko2|nekonimensfw|nsfwloli|nsfwmanga|nsfwneko|panties|zettai)$/i

handler.premium = true
handler.limit = true

export default handler