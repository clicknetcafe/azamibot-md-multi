import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let fimg = await fetch(`https://api.lolhuman.xyz/api/meme/memeindo?apikey=${global.api}`)
        //if (!fimg.ok) throw 'Fitur Error!'
        let fimgb = Buffer.from(await fimg.arrayBuffer())
        conn.sendButton(m.chat, `_© meme cringe_`, packname + ' - ' + author, fimgb, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
    } catch (e) {
        console.log(e)
        m.reply(`Terjadi kesalahan, coba lagi nanti.`)
    }
}

handler.help = ['meme']
handler.tags = ['entertainment']
handler.command = /^meme$/i

handler.premium = true
handler.limit = true

export default handler