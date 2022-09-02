import { createSticker, StickerTypes } from 'wa-sticker-formatter'
import { addExif, videoToWebp } from '../lib/sticker.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	try {
		let q = m.quoted ? m.quoted : m
		let mime = (q.msg || q).mimetype || q.mediaType || ''
		let img = await q.download?.()
		if (/webp|image/g.test(mime) || q.gifPlayback == true) {
			let buffer = await createSticker(img, { pack: packname, author: author, type: StickerTypes.FULL })
			await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
		} else if (/video/g.test(mime)) {
			if ((q.msg || q).seconds > 11) return m.reply('Maksimal 10 detik!')
			try {
				if (q.message.videoMessage.gifPlayback == true) {
					let buffer = await createSticker(img, { pack: packname, author: author, type: StickerTypes.FULL })
					await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
				} else {
					let buff = await videoToWebp(img)
					let buffer = await addExif(buff, packname, author)
					await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
				}
			} catch (e) {
				console.log(e)
				let buff = await videoToWebp(img)
				let buffer = await addExif(buff, packname, author)
				await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
			}
		} else {
			m.reply(`Kirim Gambar/Video Dengan Caption *${usedPrefix + command}*\nDurasi Video 1-9 Detik`)
		}
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan, coba lagi nanti.`)
	}
}

handler.help = ['stiker (caption|reply media)', 'stiker <url>']
handler.tags = ['creator']
handler.command = /^(s(tic?ker)?(gif)?)$/i

export default handler