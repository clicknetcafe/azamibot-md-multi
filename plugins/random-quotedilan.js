import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
    await delay(2000)
    let res = await fetch(`https://api.lolhuman.xyz/api/quotes/dilan?apikey=${global.api}`)
    let json = await res.json()
    if (json.status != '200') throw 'Fitur Error!'
    conn.sendButton(m.chat, `${json.result}`, `⭔ Dilan Quotes ⭔`, null, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
}
handler.help = ['quotedilan']
handler.tags = ['randomtext']
handler.command = /^(quotes?dilan)$/i

handler.premium = true
handler.limit = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))