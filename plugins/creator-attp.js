import { sticker } from '../lib/sticker.js'
import fs from 'fs'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!text) throw `Example : ${usedPrefix + command} Lagi Ruwet`
    const res = `https://api.lolhuman.xyz/api/${command}?apikey=${global.api}&text=${encodeURIComponent(text)}`
    const res2 = `https://xteam.xyz/attp?file&text=${encodeURIComponent(text)}`
    let ztick = fs.readFileSync(`./media/sticker/bronya.webp`)
    try {
        if (command == 'attp' || command == 'attp2') {
            let stiker = await sticker(false, res, global.packname, global.author)
            await conn.sendFile(m.chat, stiker, 'atet.webp', '', m)
        } else if (command == 'attp3') {
            let stiker = await sticker(false, res2, global.packname, global.author)
            await conn.sendFile(m.chat, stiker, 'atet.webp', '', m)
        } else {
            const stiker = await sticker(false, res, global.packname, global.author)
            await conn.sendFile(m.chat, stiker, 'atet.webp', '', m)
        }
    } catch (e) {
        console.log(e)
        await conn.sendFile(m.chat, ztick, 'atet.webp', '', m)
    }
}
handler.help = ['ttp','ttp2 -> ttp6','attp','attp2','attp3']
handler.tags = ['creator']
handler.command = /^((ttp(2|3|4|5|6)?)|(attp(2|3)?))$/i

handler.limit = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))