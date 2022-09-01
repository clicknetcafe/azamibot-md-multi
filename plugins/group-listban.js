import db from '../lib/database.js'

let handler = async (m, { conn, isOwner }) => {
    let chats = Object.entries(db.data.chats).filter(chat => chat[1].isBanned)
    let users2 = Object.entries(db.data.users).filter(user => user[1].banned && user[0].startsWith('62'))
    let users = Object.entries(db.data.users).filter(user => user[1].banned && !user[0].startsWith('62'))
    let caption = `${chats.length == 0 ? `` : `
┌〔 Daftar Chat Terbanned 〕
├ Total : ${chats.length} Chat${chats ? '\n' + chats.map(([jid], i) => `
├ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
├ ${isOwner ? '@' + jid.split`@`[0] : jid}
`.trim()).join('\n') : ''}
└────

`}${users2.length == 0 ? `` : `┌〔 Daftar +62 Mengresahkan 〕
├ Total : ${users2.length} Pengguna${users2 ? '\n' + users2.map(([jid], i) => `
├ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
├ ${isOwner ? '@' + jid.split`@`[0] : jid}
`.trim()).join('\n') : ''}
└────

`}${users.length == 0 ? `` : `┌〔 Daftar Pengguna Terbanned 〕${readMore}
├ Total : ${users.length} Pengguna${users ? '\n' + users.map(([jid], i) => `
├ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
├ ${isOwner ? '@' + jid.split`@`[0] : jid}
`.trim()).join('\n') : ''}
└────

`}
`.trim()
    conn.reply(m.chat, caption, m, { contextInfo: { mentionedJid: conn.parseMention(caption) } })
}

handler.menugroup = ['bannedlist']
handler.tagsgroup = ['group']
handler.command = /^(list(ban(ned)?|bloc?k)|(ban(ned)?|bloc?k)list|daftar(ban(ned)?|bloc?k))$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)