import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	let stiker = false
	try {
		let q = m.quoted ? m.quoted : m
		let mime = (q.msg || q).mimetype || q.mediaType || ''
		if (/webp|image/g.test(mime)) {
			let img = await q.download?.()
			if (!img) throw `Kirim Gambar/Video Dengan Caption *${usedPrefix + command}*\nDurasi Video 1-9 Detik`
			const sticker = new Sticker(img, { pack: packname, author: author, type: StickerTypes.FULL })
			const buffer = await sticker.toBuffer()
			await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
		} else if (/video/g.test(mime)) {
			if ((q.msg || q).seconds > 11) return m.reply('Maksimal 10 detik!')
			let img = await q.download?.()
			stiker = await sticker(img, false, global.packname, global.author)
			if (!stiker) {
				out = await uploadFile(img)
				console.log(out)
				stiker = await sticker(false, out, global.packname, global.author)
			}
			await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
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