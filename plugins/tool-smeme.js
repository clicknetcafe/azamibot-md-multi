import uploadImage from '../lib/uploadImage.js'
import imgbbUploader from 'imgbb-uploader'
import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
import fs from 'fs'
import { Sticker, createSticker, StickerTypes } from 'wa-sticker-formatter'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		if (!text || !text.includes('|')) throw `Usage : ${usedPrefix + command} text1|text2\n\nExample: *${usedPrefix + command} Shiro|Neko*`
		let [l, r] = text.split`|`
		if (!l) l = '-'
		if (!r) r = '-'
		let ztick = fs.readFileSync(`./media/sticker/bronya.webp`)
		try {
			let img = await q.download?.()
			let out = await uploadImage(img)
			try {
				const res = `https://api.memegen.link/images/custom/${encodeURIComponent(l)}/${encodeURIComponent(r)}.png?background=${out}`
				const sticker = new Sticker(res, { pack: packname, author: author, type: StickerTypes.FULL })
				const buffer = await sticker.toBuffer()
				await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
			} catch (e) {
				console.log(e)
				const res = `https://api.lolhuman.xyz/api/memegen?apikey=${global.api}&texttop=${encodeURIComponent(l)}&textbottom=${encodeURIComponent(r)}&img=${out}`
				const sticker = new Sticker(res, { pack: packname, author: author, type: StickerTypes.FULL })
				const buffer = await sticker.toBuffer()
				await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
			}
		} catch (e) {
			console.log(e)
			await conn.sendFile(m.chat, ztick, 'sticker.webp', '', m)
		}
	} else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command} atas|bawah* atau tag gambar yang sudah dikirim`)
	}
}

handler.help = ['smeme <teks1>|<teks2>']
handler.tags = ['tools']
handler.command = /^s(tic?ker)?meme$/i

export default handler