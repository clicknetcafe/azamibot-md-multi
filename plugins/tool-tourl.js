import uploadImage from '../lib/uploadImage.js'
import uploadFile from '../lib/uploadFile.js'

let handler = async (m, { usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || q.mtype || ''
	if (!mime || mime == 'conversation') throw 'apa yang mau di upload ?'
	let out, img = await q.download?.()
	try {
		out = await uploadImage(img)
		if (!out) throw Error()
	} catch {
		out = await uploadFile(img)
	}
	if (!out) return m.reply('error uploading file')
	if (typeof out === 'string' || out instanceof String) m.reply(`[ LINK ]\n${out}`)
	else {
		out = out.data.file
		let meta = out.metadata
		let txt = `*[ File Uploaded ]*\n`
		+ `\n*id :* ${meta.id}`
		+ `\n*name :* ${meta.name}`
		+ `\n*size :* ${meta.size.readable}`
		+ `\n*url_short :* _${out.url.short}_`
		+ `\n*url_full :* _${out.url.full}_`
		m.reply(txt)
	}
}

handler.help = ['tourl']
handler.tags = ['tools']
handler.command = /^(to(url|link))$/i

handler.limit = true

export default handler