import { createSticker, StickerTypes } from 'wa-sticker-formatter'
import { addExif, video2webp, video2webp30, video2webp45, video2webp60 } from '../lib/sticker.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	try {
		let q = m.quoted ? m.quoted : m
		let mime = (q.msg || q).mimetype || q.mediaType || ''
		command = command.toLowerCase()
	    let enam = /60|halus|smoo?th/.test(command)
	    let empat = /45/.test(command)
	    let tiga = /30/.test(command)
		if (/webp|image/g.test(mime) || q.gifPlayback == true) {
			let img = await q.download?.()
			let buffer = await createSticker(img, { pack: packname, author: author, type: StickerTypes.FULL })
			await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
		} else if (/video/g.test(mime)) {
			if ((q.msg || q).seconds > 11) return m.reply('Maksimal 10 detik!')
			let img = await q.download?.()
			try {
				if (q.message.videoMessage.gifPlayback == true) {
					let buffer = await createSticker(img, { pack: packname, author: author, type: StickerTypes.FULL })
					await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
				} else {
					let buff = enam ? await video2webp60(img) : empat ? await video2webp45(img) : tiga ? await video2webp30(img) : await video2webp(img)
					let buffer = await addExif(buff, packname, author)
					await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
				}
			} catch (e) {
				console.log(e)
				let buff = enam ? await video2webp60(img) : empat ? await video2webp45(img) : tiga ? await video2webp30(img) : await video2webp(img)
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

handler.help = ['stiker', 'stiker30fps', 'stiker45fps', 'stiker60fps']
handler.tags = ['creator']
handler.command = /^(s(tic?ker)?(gif)?(30|45|60|halus|smoo?th)?(fps)?)$/i

export default handler