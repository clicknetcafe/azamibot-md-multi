import { createSticker, StickerTypes } from 'wa-sticker-formatter'
import { sticker, addExif, video2webp } from '../../lib/sticker.js'
import { isValidUrl } from '../../lib/others.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let c = command
	if (isValidUrl(text)) {
		let s = await sticker(false, text, packname, author)
		await conn.sendFile(m.chat, s, '', '', m)
	} else {
		let buffer, q = m.quoted ? m.quoted : m
		let mime = (q.msg || q).mimetype || q.mediaType || ''
		let fps = command.replace(/\D/g, '')
		if (/image|video/g.test(mime)) {
			let ch, img = await q.download?.()
			if (/video/g.test(mime)) {
				if ((q.msg || q).seconds > 30) throw 'Maksimal 10 detik!'
				try {
					if (q.gifPlayback || q.message.videoMessage.gifPlayback) ch = 1
					else throw Error()
				} catch { ch = 2 }
			} else ch = 0
			try {
				buffer = await (ch > 1 ? addExif(await video2webp(img, isNaN(fps) ? 15 : fps), packname, author) : ch > 0 ? sticker(img, false, packname, author) : /webp/g.test(mime) ? addExif(img, packname, author) : createSticker(img, { pack: packname, author: author, type: StickerTypes.FULL }))
			} catch { return m.reply('conversion failed') }
			await conn.sendFile(m.chat, buffer, '', '', m)
		} else throw `Kirim Gambar/Video Dengan Caption *${usedPrefix + c}*\nDurasi Video 1-9 Detik`
	}
}

handler.help = ['', '30fps', '45fps', '60fps'].map(v => 'sticker' + v)
handler.tags = ['creator']
handler.command = /^(s(tic?ker)?(gif)?(30|45|60)?(fps)?)$/i

export default handler