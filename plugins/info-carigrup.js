import fetch from 'node-fetch'
import axios from 'axios'
import cheerio from 'cheerio'

async function carigroup(search, searchby = 'name') {
    let { data } = await axios.get(global.API('http://ngarang.com', '/link-grup-wa/daftar-link-grup-wa.php', {
        search: encodeURIComponent(search),
        searchby,
    }))
    let $ = cheerio.load(data)
    let results = []
    $('#content > div.entry.clearfix > div.wa-chat').each(function (index, element) {
        let subject = $(this).find('div > div.wa-chat-title-container > a > div > div').text().trim()
        let link = $(this).find('div > div.wa-chat-message > a').attr('href').trim()
        results.push({
            subject,
            link
        })
    })
    return results
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `[!] Mau nyari grup apa ?\n\nContoh:\n*${usedPrefix + command} mabar*`
    let res = await carigroup(text, 'name')
    if (!res.length) throw 'Group tidak ditemukan!'
    let teks = res.map(res => res.subject + '\n' + '_' + res.link + '_').join('\n───────────────────\n')
    let image = 'https://telegra.ph/file/f5ec51bac808f543ef1d7.png'
	await conn.sendMessage(m.chat, { image: { url: image }, caption: teks }, { quoted: m })
}

handler.help = ['carigrup']
handler.tags = ['information']
handler.command = /^((cari|find)(link)?(gc|gro?up))$/i

handler.premium = true
handler.limit = true

export default handler