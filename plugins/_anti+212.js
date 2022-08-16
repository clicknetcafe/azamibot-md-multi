import db from '../lib/database.js'

export async function before(m, { isAdmin, conn, isPrems, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return !0
    //if (!m.isGroup) return !1
    //let chat = db.data.chats[m.chat]
    //if (!isPrems && !isAdmin) {
        if (m.sender.startsWith('212') || m.sender.startsWith('265')) {
            try {
                db.data.users[m.sender].banned = true
            } catch (e) {
                console.log(e)
            }
            /*await conn.reply(m.chat, `*Group link detect!*${isBotAdmin ? '' : '\n\n_Bot not admin_  t_t'}`, m)
            if (isBotAdmin) {
                m.reply('see u next time')
                await delay(1500)
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            }*/
        }
    //}
    return !0
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))