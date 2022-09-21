import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Usage : ${usedPrefix + command} tgl|bln|thn\n\nExample: *${usedPrefix + command} 20|06|2022*`
    let [l, r, s] = text.split`|`
    if (!l || isNaN(l)) throw `Input tanggal`
    if (!r || isNaN(r)) throw `Input bulan`
    if (!s || isNaN(s)) throw `Input tahun`
    let res = await fetch(`https://api.lolhuman.xyz/api/weton/${l}/${r}/${s}?apikey=${global.api}`)
    let json = await res.json()
    if (json.status != '200') throw `Invalid Input / Fitur Error!`
    let get_result = json.result
    let ini_txt = `*${get_result.weton}*\n\n`
    ini_txt += `*Pekerjaan :* ${get_result.pekerjaan}\n\n`
    ini_txt += `*Rejeki :* ${get_result.rejeki}\n\n`
    ini_txt += `*Jodoh :* ${get_result.jodoh}`
    m.reply(ini_txt)
}

handler.help = ['weton <tgl>|<bln>|<thn>']
handler.tags = ['primbon']
handler.command = /^weton$/i

handler.premium = true
handler.limit = true

export default handler