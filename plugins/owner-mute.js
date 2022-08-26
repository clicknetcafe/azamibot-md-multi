import db from '../lib/database.js'
//const cooldown = 1000 // 1 detik
//const cooldown = 60000 // 1 menit
//const cooldown = 3600000 // 1 jam
//const cooldown = 86400000 // 1 hari
//const cooldown = 2592000000 // 1 bulan

const cooldown = 60000

let handler = async (m, { conn, args, usedPrefix, isOwner, command }) => {
    if (m.chat.includes('120363041604217979') && !isOwner) return m.reply(`[ hehe ]`)
    if (!args[0]) return m.reply(`Format : ${usedPrefix + command} <timer>\n1 = 1 menit\n5 = 5 menit ... dst.\n\nContoh : *${usedPrefix + command} 10*`)
    const total = Math.floor(isNumber(args[0]) ? Math.min(Math.max(parseInt(args[0]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
    if (total > 1000 && !isOwner) return m.reply(`[!] Maksimal ${command} : 1000 menit.`)
    let chat = db.data.chats[m.chat]
    chat.isBanned = true
    m.reply(`Bot senyap selama ${total} menit!`)
    setTimeout(() => {
        chat.isBanned = false
    }, cooldown * total)
    setTimeout(() => {
        chat.isBanned = false
        m.reply(`Bot dapat digunakan kembali.`)
    }, (cooldown * total) + 2000)
    chat.lastmute = new Date * 1 + (cooldown * total)
}

handler.menugroup = ['omute']
handler.tagsgroup = ['owner']
handler.command = /^(o(mute|senyap))$/i

handler.owner = true
handler.group = true

handler.cooldown = cooldown

export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}