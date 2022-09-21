import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let res = await fetch(`https://api.waifu.im/random/?selected_tags=${command}`)
        let json = await res.json()
        conn.sendButton(m.chat, `_Random pic : ${command}_`, packname + ' - ' + author, json.images[0].url, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
    } catch (e) {
        console.log(e)
        m.reply(`Terjadi kesalahan, coba lagi nanti`)
    }
}

handler.menuanime = ['uniform','maid','marin-kitagawa','mori-calliope','raiden-shogun','oppai','selfies']
handler.tagsanime = ['randompic']
handler.command = /^(uniform|maid|marin-kitagawa|mori-calliope|raiden-shogun|oppai|selfies)$/i

handler.premium = true
handler.limit = true

export default handler