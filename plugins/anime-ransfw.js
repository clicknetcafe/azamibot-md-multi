import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let res = await fetch(`https://api.waifu.pics/sfw/${command}`)
        let json = await res.json()
        conn.sendButton(m.chat, `_Random pic : ${command}_`, packname + ' - ' + author, json.url, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
    } catch (e) {
        console.log(e)
        m.reply(`Terjadi kesalahan, coba lagi nanti`)
    }
}

handler.menuanime = ['waifu','shinobu','megumin']
handler.tagsanime = ['randompic']
handler.command = /^(waifu|shinobu|megumin)$/i

handler.premium = true
handler.limit = true

export default handler