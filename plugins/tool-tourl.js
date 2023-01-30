import uploadImage from '../lib/uploadImage.js'
import uploadFile from '../lib/uploadFile.js'

let handler = async (m, { usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || q.mtype || ''
	let tele = /image\/(png|jpe?g|gif)|viewOnce|video\/mp4/.test(mime)
	let img = await q.download?.()
	let out = await (tele ? uploadImage : uploadFile)(img)
	m.reply(`[ LINK ]\n${out}`)
}

handler.help = ['tourl']
handler.tags = ['tools']
handler.command = /^(to(url|link))$/i

handler.limit = true

export default handler