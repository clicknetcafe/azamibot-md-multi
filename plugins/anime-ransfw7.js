import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let fimg = await fetch(`https://revita.herokuapp.com/api/wallpaper/${command}?apikey=ApiRevita`)
        //if (!fimg.ok) throw `Fitur Error!`
        let fimgb = Buffer.from(await fimg.arrayBuffer())
        conn.sendButton(m.chat, `_Random pic: ${command}_`, packname + ' - ' + author, fimgb, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
    } catch (e) {
        console.log(e)
        m.reply(`Terjadi kesalahan, coba lagi nanti`)
    }
}

handler.menuanime = ['inori','akira','akiyama','asuna','ayuzawa','chiho','chitoge','eba','emilia','erza','gremory','hestia','hinata','inori','isuzu','itori','kaga','kagura','kaori','keneki','kotori','kurumi','loli','mikasa','miku','nezuko','tejina','yotsuba','yuki','yumeko','rize','shina','shinka','shinomiya','shizuka']
handler.tagsanime = ['randompic']
handler.command = /^(akira|asuna|ayuzawa|chitoge|emilia|erza|gremory|hinata|inori|kagura|keneki|kurumi|mikasa|miku|nezuko|yotsuba|yuki|yumeko|shinomiya|tejina|chiho|kaori|shizuka|kaga|kotori|akiyama|isuzu|shina|shinka|eba|rize|hestia|itori)$/i

handler.premium = true
handler.limit = true

export default handler