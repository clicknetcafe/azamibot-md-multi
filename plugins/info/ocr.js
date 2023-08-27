import uploadImage from '../../lib/uploadImage.js'
import Tesseract from 'tesseract.js'

let handler = async (m, { usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if ((/image/g.test(mime) && !/webp/g.test(mime))) {
		let img = await q.download?.()
		try {
			let anu = await (await Tesseract.recognize(img, 'eng')).data.text
			m.reply(`*Result :*\n${anu}`)
		} catch (e) {
			console.log(e)
			throw 'failed to read text.'
		}
	} else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
}

handler.help = ['ocr']
handler.tags = ['information']
handler.command = /^(ocr)$/i

handler.premium = true
handler.limit = true

export default handler