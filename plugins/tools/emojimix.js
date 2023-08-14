import { sticker } from '../../lib/sticker.js'
import fs from 'fs'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text.includes('+')) throw `Usage : ${usedPrefix + command} emoji1|emoji2\n\nExample: *${usedPrefix + command} 😅+🤔*`
	let [l, r] = text.split`+`
	if (!l) throw 'emoji1 tidak boleh kosong'
	if (!r) throw 'emoji2 tidak boleh kosong'
	const res = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(l)}_${encodeURIComponent(r)}`)
	if (!res.ok) throw await res.text()
	let json = await res.json()
	if (!json.results) throw 'Error!'
	let ztick = fs.readFileSync(`./media/sticker/bronya.webp`)
	try {
		const stiker = await sticker(false, json.results[0].url, packname, author)
		await conn.sendFile(m.chat, stiker, '', '', m)
	} catch (e) {
		console.log(e)
		await conn.sendFile(m.chat, ztick, '', '', m)
	}
}

handler.help = ['emojimix <1>|<2>']
handler.tags = ['tools']
handler.command = /^(emojimix)$/i

export default handler