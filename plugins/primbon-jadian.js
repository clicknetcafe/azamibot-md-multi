import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Usage : ${usedPrefix + command} tgl|bln|thn\n\nExample: *${usedPrefix + command} 20|06|2022*`
    let [l, r, s] = text.split`|`
    if (!l || isNaN(l)) throw `Input tanggal`
    if (!r || isNaN(r)) throw `Input bulan`
    if (!s || isNaN(s)) throw `Input tahun`
    let res = await fetch(`https://api.lolhuman.xyz/api/jadian/${l}/${r}/${s}?apikey=${global.api}`)
    let json = await res.json()
    if (json.status != '200') throw `Invalid Input / Fitur Error!`
    let get_result = json.result
    let ini_txt = `*Karakteristik :* ${get_result.karakteristik}\n\n`
    ini_txt += `*Deskripsi :* ${get_result.deskripsi}`
    m.reply(ini_txt)
}
handler.help = ['jadian <tgl>|<bln>|<thn>']
handler.tags = ['primbon']
handler.command = /^jadian$/i

handler.premium = true
handler.limit = true

export default handler