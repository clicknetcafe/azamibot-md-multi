import { addExif } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!m.quoted) throw `Reply / Tag Stiker Sesuai Format :\n*${usedPrefix + command} <packname>|<author>*`
	let stiker = false
	try {
		let [pack, aut] = text.split('|')
		if (!pack) pack = packname
		if (!aut) aut = author
		let mime = m.quoted.mimetype || ''
		if (!/webp/.test(mime)) throw `Reply / Tag Stiker Sesuai Format :\n*${usedPrefix + command} <packname>|<author>*`
		let img = await m.quoted.download()
		if (!img) throw `Reply / Tag Stiker Sesuai Format :\n*${usedPrefix + command} <packname>|<author>*`
		stiker = await addExif(img, pack, aut)
	} catch (e) {
		console.error(e)
		if (Buffer.isBuffer(e)) stiker = e
	} finally {
		if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m, false, { asSticker: true })
		else throw 'Conversion failed'
	}
}

handler.help = ['takestick <packname>|<author>']
handler.tags = ['creator']
handler.command = /^(((stic?ker)?wm(stic?ker)?)|(takestic?(ker)?)|colong)$/i

handler.premium = true
handler.limit = true

export default handler
