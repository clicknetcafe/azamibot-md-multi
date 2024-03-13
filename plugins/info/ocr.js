import uploadImage from '../../lib/uploadImage.js'
import { createWorker } from 'tesseract.js';

let handler = async (m, { usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if ((/image/g.test(mime) && !/webp/g.test(mime))) {
		let img = await q.download?.()
		try {
			const worker = await createWorker('eng')
			const ret = await worker.recognize(await uploadImage(img))
			await m.reply(ret.data.text)
			await worker.terminate()
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