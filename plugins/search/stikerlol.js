import { delay } from '../../lib/func.js'
import fs from 'fs'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

const bete = 'https://api.lolhuman.xyz/api/sticker'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
	let res
	if (command.includes('gura')) {
		res = `${bete}/gawrgura?apikey=${api.lol}`
	} else if (command.includes('patrick') || command.includes('patrik')) {
		res = `${bete}/patrick?apikey=${api.lol}`
	} else {
		res = `${bete}/${command.replace(/s(tic?ker)?/, '').replace('bucin', 'bucinstick')}?apikey=${api.lol}`
	}
	let ztick = fs.readFileSync(`./media/sticker/bronya.webp`)
	try {
		const sticker = new Sticker(res, { pack: packname, author: author, type: StickerTypes.FULL })
		const buffer = await sticker.toBuffer()
		await conn.sendFile(m.chat, buffer, '', '', m)
	} catch (e) {
		console.log(e)
		await conn.sendFile(m.chat, ztick, '', '', m)
	}
}

handler.help = ['anjing','bucin','gawrgura','patrick'].map(v => 'stiker' + v)
handler.tags = ['searching']
handler.command = /^(s(tic?ker)?(anjing|bucin|(gawr?)?gura|patric?k))$/i

handler.premium = true
handler.limit = true

export default handler