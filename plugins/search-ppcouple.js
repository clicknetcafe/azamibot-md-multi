import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let res = await fetch(`https://api.lolhuman.xyz/api/random/ppcouple?apikey=${global.api}`)
        let json = await res.json()
        conn.sendFile(m.chat, json.result.male, 'ppmale.jpg', `male`)
        conn.sendFile(m.chat, json.result.female, 'ppfemale.jpg', `female`)
    } catch (e) {
        console.log(e)
        m.reply(`Terjadi kesalahan, coba lagi nanti.`)
    }
}

handler.help = ['ppcouple']
handler.tags = ['searching']
handler.command = /^((pp)?couple|ppcp)$/i

handler.premium = true
handler.limit = true

export default handler