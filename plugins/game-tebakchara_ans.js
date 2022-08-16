import db from '../lib/database.js'
import similarity from 'similarity'
const threshold = 0.72

export async function before(m) {
    let user = db.data.users[m.sender]
    if (user.banned) return null
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text)
        return !0
    this.tebakchara = this.tebakchara ? this.tebakchara : {}
    if (!(id in this.tebakchara))
        return
    if (m.quoted.id == this.tebakchara[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakchara[id][1]))
        if (m.text.toLowerCase() == json.result.name.toLowerCase().trim()) {
            user.exp += this.tebakchara[id][2]
            user.money += this.tebakchara[id][2]
            this.sendButton(m.chat, `*Benar!* 🎉\n\n+${this.tebakchara[id][2]} Exp\n+${this.tebakchara[id][2]} Money`, packname + ' - ' + author, ['tebakchara', '/tebakchara'], m)
            clearTimeout(this.tebakchara[id][3])
            delete this.tebakchara[id]
        } else if (similarity(m.text.toLowerCase(), json.result.name.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            m.reply(`*Salah!*`)
    }
    return !0
}

export const exp = 0
export const money = 0