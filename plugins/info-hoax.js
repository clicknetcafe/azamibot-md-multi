import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let res = await fetch(`https://api.lolhuman.xyz/api/turnbackhoax?apikey=${global.api}`)
    let json = await res.json()
    if (json.status != '200') throw `Informasi tidak tersedia.`
    let get_result = json.result
    let ini_txt = '*Info Hoax :*'
    for (var x of get_result) {
        ini_txt += `\n\nTitle : *${x.title}*\n`
        ini_txt += `Link : ${x.link}\n`
        ini_txt += `Posted : ${x.posted}\n`
        ini_txt += `Description : ${x.desc}\n`
        ini_txt += `───────────────────`
    }
    m.reply(ini_txt)
}

handler.help = ['hoax']
handler.tags = ['information']
handler.command = /^(info)?hoax$/i

handler.premium = true
handler.limit = true

export default handler