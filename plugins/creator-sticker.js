import { createSticker, StickerTypes } from 'wa-sticker-formatter'
import { sticker, addExif, video2webp, video2webp30, video2webp45, video2webp60 } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let c = command
	if ((text || '-').match(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/)) {
		let s = await sticker(false, text, packname, author)
		if (!Buffer.isBuffer(s)) throw 'no buffer'
		await conn.sendFile(m.chat, s, 'sticker.webp', '', m)
	} else {
		let buffer, q = m.quoted ? m.quoted : m
		let mime = (q.msg || q).mimetype || q.mediaType || ''
		if (/image/g.test(mime)) {
			let img = await q.download?.()
			buffer = await (/webp/g.test(mime) ? addExif(img, packname, author) : createSticker(img, { pack: packname, author: author, type: StickerTypes.FULL }))
			await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
		} else if (/video/g.test(mime)) {
			if ((q.msg || q).seconds > 11) throw 'Maksimal 10 detik!'
			let img = await q.download?.()
			try {
				if (q.gifPlayback || q.message.videoMessage.gifPlayback) buffer = await sticker(img, false, packname, author)
				else throw Error()
			} catch (e) {
				console.log(e)
				let buff = await (/60/.test(c) ? video2webp60(img) : /45/.test(c) ? video2webp45(img) : /30/.test(c) ? video2webp30(img) : video2webp(img))
				buffer = await addExif(buff, packname, author)
			}
			await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
		} else throw `Kirim Gambar/Video Dengan Caption *${usedPrefix + c}*\nDurasi Video 1-9 Detik`
	}
}

handler.help = ['', '30fps', '45fps', '60fps'].map(v => 'sticker' + v)
handler.tags = ['creator']
handler.command = /^(s(tic?ker)?(gif)?(30|45|60)?(fps)?)$/i

export default handler