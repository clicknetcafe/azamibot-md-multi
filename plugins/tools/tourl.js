import uploadImage from '../../lib/uploadImage.js'
import { niceBytes } from '../../lib/func.js'

let handler = async (m, { usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (!mime || mime == 'conversation') return m.reply('apa yang mau di upload ?')
	let img = await q.download?.()
	let out = await uploadImage(img, true)
	if (!out) throw 'Gagal upload media.'
	if (typeof out === 'string' || out instanceof String) m.reply(`[ LINK ]\n${out}`)
	else {
		out = out.result
		let txt = `*[ File Uploaded ]*\n`
		+ `\n*host :* ${out.host}`
		+ `\n*file_name :* ${out.filename}`
		+ `\n*file_size :* ${isNaN(out.filesize) ? out.filesize : niceBytes(out.filesize)}`
		+ `\n*file_url :* _${out.url}_`
		m.reply(txt)
	}
}

handler.help = ['tourl','upload']
handler.tags = ['tools']
handler.command = /^(to(url|link)|upload)$/i

handler.limit = true

export default handler