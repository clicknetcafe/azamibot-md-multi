import uploadImage from '../lib/uploadImage.js'
import uploadFile from '../lib/uploadFile.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (text || /image|video|sticker|webp/g.test(mime)) {
		let out, img
		try {
			if (/image|video|sticker|webp/g.test(mime)) {
				img = await q.download?.()
				try {
					out = await uploadImage(img)
				} catch {
					out = await uploadFile(img)
				}
			} else {
				out = text
			}
			if (command.includes('cutt')) {
				let res = await fetch(`https://api.lolhuman.xyz/api/shortlink3?apikey=${apilol}&url=${out}`)
				if (!res.ok) throw new e()
				let anu = await await res.json()
				m.reply(`[ LINK ]\n${anu.result}`)
			} else if (command.includes('bitly')) {
				let res = await fetch(`https://api.botcahx.biz.id/api/linkshort/bitly?link=${out}&apikey=Admin`)
				let anu = await await res.json()
				m.reply(`[ LINK ]\n${anu.result}`)
			} else if (command.includes('ouo')) {
				let res = await fetch(`https://api.lolhuman.xyz/api/ouoshortlink?apikey=${apilol}&url=${out}`)
				if (!res.ok) throw new e()
				let anu = await await res.json()
				m.reply(`[ LINK ]\n${anu.result}`)
			} else if (command.includes('shrtco')) {
				let res = await fetch(`https://api.lolhuman.xyz/api/shortlink2?apikey=${apilol}&url=${out}`)
				if (!res.ok) throw new e()
				let anu = await await res.json()
				m.reply(`[ LINK ]\n${anu.result}`)
			} else {
				try {
					let res = await fetch(`https://azami-api.herokuapp.com/api/tools/tinyurl?url=${out}&apikey=${global.bb}`)
					let anu = await await res.json()
					if (anu.result == undefined) throw new e()
					m.reply(`[ LINK ]\n${anu.result}`)
				} catch (e) {
					let res = await fetch(`https://api.lolhuman.xyz/api/shortlink3?apikey=${apilol}&url=${out}`)
					if (!res.ok) throw new e()
					let anu = await await res.json()
					m.reply(`[ LINK ]\n${anu.result}`)
				}
			}
		} catch (e) {
			m.reply(`[ LINK ]\n=> invalid source`)
		}
	} else {
		m.reply(`Kirim Teks URL atau gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
}

handler.help = ['bitly','cuttly','ouo','shortlink','shrtco','tinyurl']
handler.tags = ['tools']
handler.command = /^(short(link|url)|(cutt|bit)ly|ouo(io)?|shrtco|tiny(url)?)$/i

handler.limit = true

export default handler