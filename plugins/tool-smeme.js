import uploadImage from '../lib/uploadImage.js'
import uploadFile from '../lib/uploadFile.js'
import fs from 'fs'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (!/image\/(jpe?g|png|webp)/.test(mime)) throw `Tag gambar / stiker dengan caption *${usedPrefix + command} atas|bawah* atau tag gambar yang sudah dikirim`
	if (!text) throw `Usage : ${usedPrefix + command} text1|text2\n\nExample: *${usedPrefix + command} Shiro|Neko*`
	let [l, r] = text.split`|`
	if (!l) l = '-'
	if (!r) r = '-'
	let ztick = fs.readFileSync(`./media/sticker/bronya.webp`)
	let out, img = await q.download?.()
	try { out = await uploadImage(img) }
	catch { out = await uploadFile(img) }
	try {
		let res = `https://api.memegen.link/images/custom/${encodeURIComponent(l)}/${encodeURIComponent(r)}.png?background=${out}`
		let sticker = new Sticker(res, { pack: packname, author: author, type: StickerTypes.FULL })
		ztick = await sticker.toBuffer()
		await conn.sendFile(m.chat, ztick, 'sticker.webp', '', m)
	} catch (e) {
		console.log(e)
		try {
			let res = `https://api.lolhuman.xyz/api/memegen?apikey=${apilol}&texttop=${encodeURIComponent(l)}&textbottom=${encodeURIComponent(r)}&img=${out}`
			let sticker = new Sticker(res, { pack: packname, author: author, type: StickerTypes.FULL })
			ztick = await sticker.toBuffer()
			await conn.sendFile(m.chat, ztick, 'sticker.webp', '', m)
		} catch (e) {
			console.log(e)
			await conn.sendFile(m.chat, ztick, 'sticker.webp', '', m)
		}
	}
}

handler.help = ['smeme <teks1>|<teks2>']
handler.tags = ['tools']
handler.command = /^(s(tic?ker)?meme)$/i

export default handler