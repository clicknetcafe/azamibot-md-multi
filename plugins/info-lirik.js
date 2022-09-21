import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Example : ${usedPrefix + command} melukis senja`
    let res = await fetch(`https://api.lolhuman.xyz/api/lirik?apikey=${global.api}&query=${encodeURIComponent(text)}`)
    let json = await res.json()
    if (json.status != '200') throw `Lirik tidak ditemukan.`
    m.reply(json.result)
}

handler.help = ['lirik <teks>']
handler.tags = ['information']
handler.command = /^l(i|y)ri(c|k)$/i

handler.premium = true
handler.limit = true

export default handler