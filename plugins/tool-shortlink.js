import uploadImage from '../lib/uploadImage.js'
import imgbbUploader from 'imgbb-uploader'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		let img = await q.download?.()
		console.log(img)
		let out = await uploadImage(img)
		try {
			let res = await fetch(`https://api-xcoders.xyz/api/tools/shorturl?url=${out}&apikey=${global.xco}`)
			let json = await res.json()
			m.reply(`[ LINK ]\n${json.result}`)
		} catch (e) {
			console.log(e)
			try {
				let res = await fetch(`https://api-xcoders.xyz/api/tools/cuttly?url=${out}&apikey=${global.xco}`)
				let json = await res.json()
				m.reply(`[ LINK ]\n${json.result}`)
			} catch (e) {
				console.log(e)
				try {
					let res = await fetch(`https://betabotz-api.herokuapp.com/api/tools/tinyurl?url=${out}&apikey=${global.bb}`)
					let json = await res.json()
					m.reply(`[ LINK ]\n${json.result}`)
				} catch (e) {
					console.log(e)
					m.reply(`Terjadi kesalahan, coba lagi nanti.`)
				}
			}
		}
	} else if (text && (!/image/g.test(mime) || !/webp/g.test(mime))) {
		try {
			let res = await fetch(`https://betabotz-api.herokuapp.com/api/tools/tinyurl?url=${text}&apikey=${global.bb}`)
			let json = await res.json()
			m.reply(`[ LINK ]\n${json.result}`)
		} catch (e) {
			console.log(e)
			try {
				let res = await fetch(`https://api-xcoders.xyz/api/tools/shorturl?url=${text}&apikey=${global.xco}`)
				let json = await res.json()
				m.reply(`[ LINK ]\n${json.result}`)
			} catch (e) {
				console.log(e)
				try {
					let res = await fetch(`https://api-xcoders.xyz/api/tools/cuttly?url=${text}&apikey=${global.xco}`)
					let json = await res.json()
					m.reply(`[ LINK ]\n${json.result}`)
				} catch (e) {
					console.log(e)
					m.reply(`Terjadi kesalahan, coba lagi nanti.`)
				}
			}
		}
	} else {
		m.reply(`Kirim Teks URL atau gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
}

handler.help = ['shortlink']
handler.tags = ['tools']
handler.command = /^(shortlink|tinyurl)$/i

handler.limit = true

export default handler