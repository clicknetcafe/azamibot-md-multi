import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        let bot = conn.user.jid // Bot
        let img = await q.download()
        if (!img) throw 'gagal mengambil gambar'
        await conn.updateProfilePicture(m.chat, img)
        conn.reply(m.chat, 'Sukses Mengganti Icon Group!', m)
    } else {
        m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
    }
}

handler.menugroup = ['setppgc']
handler.tagsgroup = ['group']
handler.command = /^(set((gro?up|gc)pp|pp(gro?up|gc)))$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler