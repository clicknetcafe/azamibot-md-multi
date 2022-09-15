let handler = async(m, { conn, text, args, command, usedPrefix }) => {
	if (!text) throw `[ MENFESS ]\nFormat : *${usedPrefix + command} nomor | pesan untuknya*\n\nContoh : *${usedPrefix + command} 628xxxxxxxxxx | hai kamu*`
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[0] ? (args[0].split`|`[0].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
	let meh = await conn.onWhatsApp(who)
	if (meh.length == 0) return m.reply(`[!] Failed, @${(args[0].split`|`[0] || '')} bukan pengguna WhatsApp.`, null, { mentions: [args[0].split`|`[0]] })
	if (text.includes('|')) args[1] = text.split`|`.slice(1)
	else args[1] = args.slice(1).join(' ')
	if (!who) throw `tag atau ketik nomornya!`
	if (who.includes(conn.user.jid.split`@`[0])) throw `[!] Tidak bisa mengirim *menfess* ke Bot`
	if (!args[1]) throw `[!] Masukkan isi pesan`
	if (args[1].length > 700) throw `[!] Teks Kepanjangan`
    let q = m.quoted ? m.quoted : m
    who = meh[0].jid
	let buffer, mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image|video|sticker|webp|audio/g.test(mime)) buffer = await q.download?.()
	else mime = ''
	let target = `Hi Saya Bot, Ada Yang Kirim Pesan ${mime == '' ? '' : `*${mime}*` } Ke Kamu\n\n( Dari : *Pengirim Rahasia* )\n\n${mime == '' ? '' : `*${mime.includes('video') ? '🎬' : mime.includes('audio') ? '🎧' : '🎴'} Jenis Pesan :*\n*${mime}* di atas ☝ ☝ ☝\n\n`}💌 *Isi Pesan :*\n${args[1]}\n\n_Tertarik mencoba ? Ketik *${usedPrefix + command}*_`
	let senderr = `Mengirim Pesan ${mime != '' ? `*${mime}*` : ''}\n👥 Untuk : wa.me/${who.split("@s.whatsapp.net")[0]}\n\n*Isi Pesan :*\n${args[1]}`
	if (mime != '' && !mime.includes('audio')) {
		await conn.sendFile(m.sender, buffer, '', senderr, null)
		if (mime.includes('webp')) conn.sendMessage(m.sender, { text: senderr })
	} else {
		await conn.reply(m.sender, senderr, m)
	}
	if (mime.includes('audio')) await conn.sendFile(who, buffer, 'audio.mp3', '', null, true, { mimetype: 'audio/mp4' })
	if (mime != '' && !mime.includes('audio')) {
		await conn.sendFile(who, buffer, '', target, null)
		if (mime.includes('webp')) await conn.sendMessage(who, { text: target })
	} else {
		await conn.reply(who, target, null)
	}
	if (m.isGroup) await m.reply(`Sukses mengirim pesan *${mime ? mime : 'teks'}*`)
}

handler.help = ['menfess <nomor|pesan>']
handler.tags = ['entertainment']
handler.command = /^(me(m|n)fess?|chat)$/i

handler.limit = true

export default handler