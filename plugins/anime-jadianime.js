import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'
import AI2D from '@arugaz/ai2d'

let handler = async (m, { conn, usedPrefix, command, text, apilol }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	let anu, buffer, c = `*Jadi Anime*`
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		let p, img = await q.download?.()
		let out = await uploadImage(img)
		try {
			let anu = await AI2D(out, { crop: `${/twin|duo|dual|compare/g.test(text) ? 'COMPARED' : 'SINGLE'}` })
			await conn.sendMessage(m.chat, { image: anu, caption: c }, { quoted: m })
		} catch (e) {
			p = e.toString()
			try {
				anu = await fetch(`https://api.lolhuman.xyz/api/imagetoanime?apikey=${apilol}&img=${out}`)
				buffer = Buffer.from(await anu.arrayBuffer())
				if (Buffer.byteLength(buffer) < 100) throw Error('error, no buffer')
				await conn.sendMessage(m.chat, { image: buffer, caption: c }, { quoted: m })
			} catch (e) {
				console.log(e)
				m.reply(p || `[ ! ] Gagal, gunakan foto lainnya.`)
			}
		}
	} else m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
}

handler.menuanime = ['jadianime']
handler.tagsanime = ['search']
handler.command = /^((to|jadi)a?nime)$/i

handler.premium = true
handler.limit = true

export default handler