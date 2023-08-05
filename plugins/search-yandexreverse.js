import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, command, text, usedPrefix }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image\/(jpe?g|png)/.test(mime) && !/webp/.test(mime)) {
		let img = await q.download()
		let out = await uploadImage(img)
		let anu = await (await fetch(`https://api.lolhuman.xyz/api/reverseyandex?apikey=${apilol}&img=${out}`)).json()
		if (anu.status !== 200) return m.reply('Internal server error.')
		m.reply(`[ YANDEX REVERSE SEARCH ]\n\n_${anu.result}_`)
	} else throw `Kirim Gambar Dengan Caption *${usedPrefix + command}*`
}

handler.help = ['yandexreverse']
handler.tags = ['searching']
handler.command = /^(yandexreverse)$/i

export default handler