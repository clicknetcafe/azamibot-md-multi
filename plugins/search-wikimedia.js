import fetch from 'node-fetch'
import { wikimedia } from '../lib/others.js'

let handler = async (m, { conn, command, text, usedPrefix }) => {
	if (!text) return m.reply(`Example: *${usedPrefix + command} indonesia*`)
	try {
		let anu = await wikimedia(text)
		if (anu.length == 0) throw Error()
		anu = anu.getRandom()
		await conn.sendButton(m.chat, `${command} > ${text}\n\n${anu.title}\n_${anu.source}_`, pauthor, anu.image, [[`⧑ next ${command} ⧑`, `${usedPrefix + command} ${text}`]], m)
	} catch (e) {
		console.log(e)
		m.reply(`No Result Found.`)
	}
}

handler.help = ['wikimedia <text>']
handler.tags = ['searching']
handler.command = /^(wikimedia)$/i

handler.limit = true

export default handler