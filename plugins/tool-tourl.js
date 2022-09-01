import uploadImage from '../lib/uploadImage.js'
import uploadFile from '../lib/uploadFile.js'

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image|webp|sticker|audio|video/g.test(mime)) {
		let img = await q.download?.()
		try {
			let out = await uploadImage(img)
			m.reply(`[ LINK ]\n${out}`)
		} catch (e) {
			console.log(e)
			try {
				let out = await uploadFile(img)
				m.reply(`[ LINK ]\n${out}`)
			} catch (e) {
				console.log(e)
				m.reply(`Terjadi kesalahan, coba lagi nanti.`)
			}
		}
	} else {
		m.reply(`Kirim media dengan caption *${usedPrefix + command}* atau tag media yang sudah dikirim`)
	}
}

handler.help = ['tourl']
handler.tags = ['tools']
handler.command = /^(to(url|link))$/i

handler.limit = true

export default handler