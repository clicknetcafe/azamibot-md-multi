import db from '../lib/database.js'

let handler = async (m, { participants }) => {
    db.data.chats[m.chat].isBanned = true
    m.reply('Bot dalam mode nyimak.')
}

handler.menugroup = ['banchat']
handler.tagsgroup = ['owner']
handler.command = /^(banchat)$/i

handler.owner = true

export default handler