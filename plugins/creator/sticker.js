import { createSticker, StickerTypes } from 'wa-sticker-formatter'
import { sticker, addExif, video2webp } from '../../lib/sticker.js'
import { isUrl } from '../../lib/func.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let c = command
	try {
		if (isUrl(text)) {
			let s = await sticker(false, text, packname, author)
			await conn.sendFile(m.chat, s, '', '', m)
		} else {
			let buffer, q = m.quoted ? m.quoted : m
			let mime = (q.msg || q).mimetype || q.mediaType || ''
			let fps = command.replace(/\D/g, '')
			if (/image|video/g.test(mime)) {
				let ch, img = await q.download?.()
				if (/video/g.test(mime)) {
					if ((q.msg || q).seconds > 30) return m.reply('Maksimal 10 detik!')
					if (q.gifPlayback || q.message?.videoMessage?.gifPlayback) ch = 1
					else ch = 2
				} else ch = 0
				buffer = await (ch > 1 ? addExif(await video2webp(img, isNaN(fps) ? 15 : fps), packname, author) : ch > 0 ? sticker(img, false, packname, author) : /webp/g.test(mime) ? addExif(img, packname, author) : createSticker(img, { pack: packname, author: author, type: StickerTypes.FULL }))
				await conn.sendFile(m.chat, buffer, '', '', m)
			} else return m.reply(`Kirim Gambar/Video Dengan Caption *${usedPrefix + c}*\nDurasi Video 1-9 Detik`)
		}
	} catch (e) {
		console.log(e)
		throw 'conversion failed.'
	}
}

handler.help = ['', '30fps', '45fps', '60fps'].map(v => 'sticker' + v)
handler.tags = ['creator']
handler.command = /^(s(tic?ker)?(gif)?(30|45|60)?(fps)?)$/i

export default handler