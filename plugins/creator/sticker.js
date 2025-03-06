import { sticker, sticker3, addExif, video2webp } from '../../lib/sticker.js'
import { isUrl } from '../../lib/func.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let c = command
	try {
		if (isUrl(text)) {
			let s = await sticker(false, text, packname, author)
			await conn.sendFile(m.chat, s, '', '', m)
		} else {
			let buffer, q = m.quoted ? m.quoted : m
			let mime = (q.msg || q).mimetype || q.mediaType || ''
			let fps = command.replace(/\D/g, '')
			if (/image|video/g.test(mime)) {
				let ch, img = await q.download?.()
				let sec = (q.msg || q)?.seconds
				if (/video/g.test(mime)) {
					if (sec > 20) return m.reply('maksimal 15 detik!')
					await conn.sendMsg(m.chat, { react: { text: '⏱️', key: m.key } })
					ch = (q.gifPlayback || q.message?.videoMessage?.gifPlayback) ? 1 : 2
				} else ch = 0
				if (ch > 0) buffer = await (/webp/g.test(mime) ? addExif(img, packname, author) : ch > 1 ? addExif(await video2webp(img, sec), packname, author) : sticker(img, false, packname, author))
				else {
					try { buffer = await addExif(await sticker3(img, false), packname, author) }
					catch { buffer = await sticker(img, false, packname, author) }
				}
				await conn.sendFile(m.chat, buffer, '', '', m)
			} else return m.reply(`send img / video(0-15sec), caption *${usedPrefix + c}*`)
		}
	} catch (e) {
		console.log(e)
		throw 'conversion failed.'
	}
}

handler.help = ['sticker']
handler.tags = ['creator']
handler.command = /^(s(tic?ker)?(gif)?)$/i

export default handler