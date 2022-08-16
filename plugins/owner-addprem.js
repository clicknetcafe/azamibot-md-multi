import fs from 'fs'

let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
    else who = m.chat
    if (!who) throw `tag orangnya!`
    if (global.prems.includes(who.split`@`[0])) return m.reply('dia udah premium!')
    let beforejoin = `'${global.prems.toString().replaceAll(',',`','`)}'`
    let handler = await fs.readFileSync(`./handler.js`, 'utf8')
    await delay(250)
    await global.prems.push(`${who.split`@`[0]}`)
    await delay(250)
    let afterjoin = `'${global.prems.toString().replaceAll(',',`','`)}'`
    await fs.writeFileSync(`./handler.js`, `${handler.replace(`global.prems = [${beforejoin}]`,`global.prems = [${afterjoin}]`)}`)
    m.reply(`@${(who || '').replace(/@s\.whatsapp\.net/g, '')} sekarang premium!.`, null, { mentions: [who] })
}

handler.mengroup = ['addprem <@tag>']
handler.tagsgroup = ['owner']
handler.command = /^(addprem(ium)?)$/i

handler.owner = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))