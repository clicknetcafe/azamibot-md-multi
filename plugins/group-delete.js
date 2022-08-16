import db from '../lib/database.js'

let handler = async (m, { conn, isOwner }) => {
    if (!m.quoted) throw false
    let { chat, fromMe, isBaileys } = m.quoted
    let charm = db.data.chats[m.chat]
    if (!fromMe) throw false
    if (!isBaileys) throw 'Pesan tersebut bukan dikirim oleh bot!'
    if ((!charm.nsfw && m.isGroup) || isOwner) {
        conn.sendMessage(chat, { delete: m.quoted.vM.key })
    } else {
        throw `Tidak dapat hapus pesan saat *nsfw* aktif!`
    }
}
handler.menugroup = ['del', 'delete']
handler.tagsgroup = ['group']
handler.command = /^(d(el(ete)?)?)$/i

handler.group = true

export default handler