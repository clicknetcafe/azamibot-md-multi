import { createSticker } from 'wa-sticker-formatter'
import fs from 'fs'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
	text = text ? text : m.quoted?.text ? m.quoted.text : m.quoted?.caption ? m.quoted.caption : m.quoted?.description ? m.quoted.description : ''
	if (!text) throw `Example : ${usedPrefix + command} Lagi Ruwet`
	try {
		let stiker = await createSticker(`https://api.lolhuman.xyz/api/${command}?apikey=${api.lol}&text=${encodeURIComponent(text.substring(0, 151))}`, { pack: packname, author: author })
		await conn.sendFile(m.chat, stiker, '', '', m)
	} catch (e) {
		console.log(e)
		await conn.sendFile(m.chat, fs.readFileSync(`./media/sticker/bronya.webp`), '', '', m)
	}
}

handler.help = ['ttp','ttp2','ttp3','ttp4','ttp5','ttp6','attp','attp2']
handler.tags = ['creator']
handler.command = /^((ttp(2|3|4|5|6)?)|(attp2?))$/i

handler.limit = true

export default handler