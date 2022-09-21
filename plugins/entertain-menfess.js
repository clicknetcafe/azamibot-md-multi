let handler = async(m, { conn, text, args, command, usedPrefix }) => {
	if (!text) throw `[ MENFESS ]\nFormat : *${usedPrefix + command} nomor | pesan untuknya*\n\nContoh : *${usedPrefix + command} 628xxxxxxxxxx | hai kamu*`
	if (text.includes('|')) {
		args[0] = text.split(`|`)[0].replaceAll(' ','')
		args[1] = text.split(`|`)[1]
	} else {
		args[1] = args.slice(1).join(' ')
	}
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[0] ? (args[0].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
	let meh = await conn.onWhatsApp(who)
	if (meh.length == 0) return m.reply(`[!] Failed, @${(args[0] || '')} bukan pengguna WhatsApp.`, null, { mentions: [args[0]] })
	if (!who) throw `tag atau ketik nomornya!`
	if (who.includes(conn.user.jid.split`@`[0])) throw `[!] Tidak bisa mengirim *menfess* ke Bot`
	who = meh[0].jid
	if (!args[1]) throw `[!] Masukkan isi pesan`
	if (args[1].length > 3000) throw `[!] Teks Kepanjangan`
	let buffer, q = m.quoted ? m.quoted : m, mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image|video|sticker|webp|audio/g.test(mime)) buffer = await q.download?.()
	let target = `Hi Saya Bot, Ada Yang Kirim Pesan ${mime ? `*${mime}*` : '' } Ke Kamu\n\n( Dari : *Pengirim Rahasia* )\n\n${mime ? `*${mime.includes('video') ? '🎬' : mime.includes('audio') ? '🎧' : '🎴'} Jenis Pesan :*\n*${mime}* di atas ☝ ☝ ☝\n\n` : ''}💌 *Isi Pesan :*\n${args[1]}\n\n_Tertarik mencoba ? Ketik *${usedPrefix + command}*_`
	let senderr = `Mengirim Pesan ${mime ? `*${mime}*` : ''}\n👥 Untuk : wa.me/${who.split("@s.whatsapp.net")[0]}\n\n*Isi Pesan :*\n${args[1]}`
	if (mime.includes('audio')) await conn.sendMessage(who, { audio: buffer, mimetype: 'audio/mpeg', ptt: true })
	if (mime != '' && !mime.includes('audio')) {
		if (mime.includes('webp')) {
			await conn.sendMessage(who, { text: target })
			await conn.sendMessage(m.sender, { text: senderr })
		}
		await conn.sendFile(who, buffer, '', target, null)
		await conn.sendFile(m.sender, buffer, '', senderr, null)
	} else {
		await conn.reply(who, target, null)
		await conn.reply(m.sender, senderr, m)
	}
	if (m.isGroup) await m.reply(`Sukses mengirim pesan *${mime ? mime : 'teks'}*`)
}

handler.help = ['menfess <nomor|pesan>']
handler.tags = ['entertainment']
handler.command = /^(me(m|n)fess?|chat)$/i

handler.limit = true

export default handler