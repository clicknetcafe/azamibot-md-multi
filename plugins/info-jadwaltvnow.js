import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let res = await fetch(`https://api.lolhuman.xyz/api/jadwaltv/now?apikey=${global.api}`)
    if (!res.ok) throw 'Fitur Error!'
    let json = await res.json()
    if (json.status != '200') throw `Error!`
    let get_result = json.result
    let ini_txt = `*Jadwal TV Now :*`
    for (var x in get_result) {
        ini_txt += `\n\n${x.toUpperCase()}${get_result[x]}\n───────────────────`
    }
    m.reply(ini_txt)
}

handler.help = ['jadwaltvnow']
handler.tags = ['information']
handler.command = /^jadwaltvnow$/i

handler.premium = true
handler.limit = true

export default handler