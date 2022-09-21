import fetch from 'node-fetch'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!text) throw `Example : ${usedPrefix + command} Miyuki`
    try {
        let res = await fetch(`https://api.lolhuman.xyz/api/character?apikey=${global.api}&query=${encodeURIComponent(text)}`)
        let json = await res.json()
        let get_result = json.result
        let ini_txt = `Id : ${get_result.id}\n\n`
        ini_txt += `Name : *${get_result.name.full}*\n`
        ini_txt += `Native : *${get_result.name.native}*\n`
        ini_txt += `Favorites : ${get_result.favourites}\n\n`
        ini_txt += `*Media :*\n`
        let ini_media = get_result.media.nodes
        for (var x of ini_media) {
            ini_txt += `- ${x.title.romaji} (${x.title.native})\n`
        }
        ini_txt += `\n*Description :*\n${get_result.description.replace(/__/g, "_")}`
        conn.sendFile(m.chat, get_result.image.large, 'animanga.jpg', ini_txt, m)
    } catch (e) {
        console.log(e)
        m.reply(`Tidak ditemukan hasil.`)
    }
}

handler.menuanime = ['chara <karakter>']
handler.tagsanime = ['search']
handler.command = /^((ch|k)ara((c|k)(ter)?)?(a?nime)?)$/i

handler.premium = true
handler.limit = true

export default handler