import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
	command = command.toLowerCase()
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		let img = await q.download?.()
		let out = await uploadImage(img)
		if (command.includes('cutt')) {
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/shortlink3?apikey=${global.api}&url=${out}`)
				if (!res.ok) throw new e()
				let anu = await await res.json()
				m.reply(`[ LINK ]\n${anu.result}`)
			} catch (e) {
				m.reply(`[ LINK ]\n=> invalid url source`)
			}
		} else if (command.includes('ouo')) {
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/ouoshortlink?apikey=${global.api}&url=${out}`)
				if (!res.ok) throw new e()
				let anu = await await res.json()
				m.reply(`[ LINK ]\n${anu.result}`)
			} catch (e) {
				m.reply(`[ LINK ]\n=> invalid url source`)
			}
		} else if (command.includes('shrtco')) {
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/shortlink2?apikey=${global.api}&url=${out}`)
				if (!res.ok) throw new e()
				let anu = await await res.json()
				m.reply(`[ LINK ]\n${anu.result}`)
			} catch (e) {
				m.reply(`[ LINK ]\n=> invalid url source`)
			}
		} else {
			try {
				let res = await fetch(`https://betabotz-api.herokuapp.com/api/tools/tinyurl?url=${out}&apikey=${global.bb}`)
				let anu = await await res.json()
				if (anu.result == undefined) throw new e()
				m.reply(`[ LINK ]\n${anu.result}`)
			} catch (e) {
				try {
					let res = await fetch(`https://api.lolhuman.xyz/api/shortlink3?apikey=${global.api}&url=${out}`)
					if (!res.ok) throw new e()
					let anu = await await res.json()
					m.reply(`[ LINK ]\n${anu.result}`)
				} catch (e) {
					m.reply(`[ LINK ]\n=> invalid url source`)
				}
			}
		}
	} else if (text && (!/image/g.test(mime) || !/webp/g.test(mime))) {
		if (command.includes('cutt')) {
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/shortlink3?apikey=${global.api}&url=${text}`)
				if (!res.ok) throw new e()
				let anu = await await res.json()
				m.reply(`[ LINK ]\n${anu.result}`)
			} catch (e) {
				m.reply(`[ LINK ]\n=> invalid url source`)
			}
		} else if (command.includes('ouo')) {
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/ouoshortlink?apikey=${global.api}&url=${text}`)
				if (!res.ok) throw new e()
				let anu = await await res.json()
				m.reply(`[ LINK ]\n${anu.result}`)
			} catch (e) {
				m.reply(`[ LINK ]\n=> invalid url source`)
			}
		} else if (command.includes('shrtco')) {
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/shortlink2?apikey=${global.api}&url=${text}`)
				if (!res.ok) throw new e()
				let anu = await await res.json()
				m.reply(`[ LINK ]\n${anu.result}`)
			} catch (e) {
				m.reply(`[ LINK ]\n=> invalid url source`)
			}
		} else {
			try {
				let res = await fetch(`https://betabotz-api.herokuapp.com/api/tools/tinyurl?url=${text}&apikey=${global.bb}`)
				let anu = await await res.json()
				if (anu.result == undefined) throw new e()
				m.reply(`[ LINK ]\n${anu.result}`)
			} catch (e) {
				try {
					let res = await fetch(`https://api.lolhuman.xyz/api/shortlink3?apikey=${global.api}&url=${text}`)
					if (!res.ok) throw new e()
					let anu = await await res.json()
					m.reply(`[ LINK ]\n${anu.result}`)
				} catch (e) {
					m.reply(`[ LINK ]\n=> invalid url source`)
				}
			}
		}
	} else {
		m.reply(`Kirim Teks URL atau gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
}

handler.help = ['cuttly','ouo','shortlink','shrtco','tinyurl']
handler.tags = ['tools']
handler.command = /^(short(link|url)|cuttly|ouo(io)?|shrtco|tiny(url)?)$/i

handler.limit = true

export default handler