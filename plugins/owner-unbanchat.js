import db from '../lib/database.js'

let handler = async (m) => {
    db.data.chats[m.chat].isBanned = false
    m.reply('Bot dapat digunakan kembali.')
}

handler.menugroup = ['unbanchat']
handler.tagsgroup = ['owner']
handler.command = /^(unbanchat)$/i

handler.owner = true

export default handler