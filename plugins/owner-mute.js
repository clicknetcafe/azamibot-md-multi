import db from '../lib/database.js'
import { isNumber } from '../lib/others.js'

const cooldown = 60000

let handler = async (m, { conn, args, usedPrefix, isOwner, command }) => {
    if (m.chat.includes('120363041604217979') && !isOwner) return m.reply(`[ hehe ]`)
    if (!args[0]) return m.reply(`Format : ${usedPrefix + command} <timer>\n1 = 1 menit\n5 = 5 menit ... dst.\n\nContoh : *${usedPrefix + command} 10*`)
    const total = Math.floor(isNumber(args[0]) ? Math.min(Math.max(parseInt(args[0]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
    if (total > 1000 && !isOwner) return m.reply(`[!] Maksimal ${command} : 1000 menit.`)
    let chat = db.data.chats[m.chat]
    chat.isBanned = true
    chat.lastmute = new Date * 1
    chat.mutecd = cooldown * total
    m.reply(`Bot senyap selama ${total} menit!`)
}

handler.menuowner = ['omute']
handler.tagsowner = ['owner']
handler.command = /^(o(mute|senyap))$/i

handler.owner = true
handler.group = true

handler.cooldown = cooldown

export default handler