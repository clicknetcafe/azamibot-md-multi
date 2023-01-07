import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		try {
			let img = await q.download?.()
			let out = await uploadImage(img)
			await conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/imagetoanime?apikey=${global.api}&img=${out}` }, caption: `*Jadi Anime*` }, { quoted: m })
		} catch (e) {
			console.log(e)
			m.reply(`[ ! ] Gagal, gunakan foto lainnya.`)
		}
	} else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
}

handler.menuanime = ['jadianime']
handler.tagsanime = ['search']
handler.command = /^((to|jadi)a?nime)$/i

handler.premium = true
handler.limit = true

export default handler