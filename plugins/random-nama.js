import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = await fetch(`https://api.lolhuman.xyz/api/random/nama?apikey=${global.api}`)
    let json = await res.json()
    if (json.status != '200') throw 'Fitur Error!'
    m.reply(json.result)
}

handler.help = ['randomnama']
handler.tags = ['randomtext']
handler.command = /^randomnama$/i

handler.limit = true

export default handler