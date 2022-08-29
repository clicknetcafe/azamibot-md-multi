import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/image/g.test(mime)) {
		let img = await q.download?.()
		let out = await uploadImage(img)
		let res = await fetch(`https://api.lolhuman.xyz/api/ocr?apikey=${global.api}&img=${out}`)
	    let json = await res.json()
		if (json.status != '200') throw `Gagal medeteksi teks pada gambar.`
		let get_result = json.result
		m.reply(`*Result :*\n${get_result}`)
    } else {
    	m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
    }
}

handler.help = ['ocr']
handler.tags = ['information']
handler.command = /^ocr$/i

handler.premium = true
handler.limit = true

export default handler