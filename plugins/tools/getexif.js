import { extractMetadata } from 'wa-sticker-formatter'

let handler = async (m, { conn }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (m.quoted && /webp|sticker/g.test(mime)) {
		try {
			let img = await m.quoted.download()
			let metaData = await extractMetadata(img)
			await m.reply(JSON.stringify(metaData, null, 4))
		} catch (e) {
			console.log(e)
			m.reply(`[!] Failed extract metadata sticker.`)
		}
	} else {
		m.reply(`Tag stikernya!`)
	}
}

handler.help = ['getexif']
handler.tags = ['tools']
handler.command = /^(getexif)$/i

export default handler
