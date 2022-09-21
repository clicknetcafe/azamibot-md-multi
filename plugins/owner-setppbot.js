let handler = async (m, { conn, args, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		try {
			let bot = conn.user.jid // Bot
			let img = await q.download()
			if (!img) return m.reply(`gagal mengambil gambar`)
			await conn.updateProfilePicture (bot, img)
			await conn.reply(m.chat, 'Sukses Mengganti Foto Profile Bot!', m)
		} catch (e) {
			console.log(e)
			m.reply(`Terjadi kesalahan, coba lagi nanti.`)
		}
	} else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
}

handler.menugroup = ['setbotpp']
handler.tagsgroup = ['owner']
handler.command = /^(set(botpp|ppbot))$/i

handler.owner = true

export default handler