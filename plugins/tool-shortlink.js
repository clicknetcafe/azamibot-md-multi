import uploadImage from '../lib/uploadImage.js'
import uploadFile from '../lib/uploadFile.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || q.mtype || ''
	if (text || /image|video|sticker|webp|viewOnce/g.test(mime)) {
		let out, img
		try {
			if (/image|video|sticker|webp|viewOnce/g.test(mime)) {
				img = await q.download?.()
				try { out = await uploadImage(img) }
				catch { out = await uploadFile(img) }
			} else out = text
			let res = await fetch(`https://api.lolhuman.xyz/api/${/ouo/.test(command) ? 'ouoshortlink' : /tiny/.test(command) ? 'shortlink' : /shrtco/.test(command) ? 'shortlink2' : /tiny2/.test(command) ? 'shortlink4' : 'shortlink3'}?apikey=${apilol}&url=${out}`)
			if (!res.ok) throw Error(res.message)
			let anu = await res.json()
			m.reply(`[ LINK ]\n${anu.result}`)
		} catch (e) {
			console.log(e)
			m.reply(`[ LINK ]\n=> invalid source`)
		}
	} else {
		m.reply(`Kirim Teks URL atau gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
}

handler.help = ['ouo','tinyurl','tiny2url','shrtco','cuttly']
handler.tags = ['tools']
handler.command = /^((ouo|tiny|tiny2|shrtco|cuttly)((short)?link)?(url)?)$/i

handler.limit = true

export default handler