import db from '../lib/database.js'
import { tebakkimia } from '@bochilteam/scraper'

let timeout = 120000
let poin = 1999
let handler = async (m, { conn, usedPrefix, isPrems }) => {
    let chat = db.data.chats[m.chat]
    if (!chat.game && m.isGroup) return
    conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {}
    let id = m.chat
    if (id in conn.tebakkimia) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkimia[id][0])
        throw false
    }
    if (db.data.users[m.sender].limit < 1 && db.data.users[m.sender].money > 50000 && !isPrems) {
        throw `Beli limit dulu lah, duid lu banyak kan 😏`
    } else if (db.data.users[m.sender].limit > 0 && !isPrems) {
        db.data.users[m.sender].limit -= 1
    } else {

    }
    const json = await tebakkimia()
    let caption = `
🎮 *Unsur Kimia* 🎮

Lambang *${json.lambang}* adalah unsur dari ...

⭔ Timeout *${(timeout / 1000).toFixed(2)} detik*
⭔ Bonus: ${poin} Exp
`.trim()
    conn.tebakkimia[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakkimia[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.unsur}*`, packname + ' - ' + author, ['tebakkimia', `${usedPrefix}tebakkimia`], conn.tebakkimia[id][0])
            delete conn.tebakkimia[id]
        }, timeout)
    ]
    console.log(json.unsur)
}

handler.menufun = ['tebakkimia (exp+)']
handler.tagsfun = ['game']
handler.command = /^(tebakkimia)$/i

handler.premium = true

export default handler