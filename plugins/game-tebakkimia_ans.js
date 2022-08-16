import db from '../lib/database.js'
import similarity from 'similarity'
const threshold = 0.72

export async function before(m) {
    let user = db.data.users[m.sender]
    if (user.banned) return null
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text)
        return !0
    this.tebakkimia = this.tebakkimia ? this.tebakkimia : {}
    if (!(id in this.tebakkimia))
        return
    if (m.quoted.id == this.tebakkimia[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakkimia[id][1]))
        if (m.text.toLowerCase() == json.unsur.toLowerCase().trim()) {
            user.exp += this.tebakkimia[id][2]
            this.sendButton(m.chat, `*Benar!* 🎉\n\n+${this.tebakkimia[id][2]} Exp`, packname + ' - ' + author, ['tebakkimia', '/tebakkimia'], m)
            clearTimeout(this.tebakkimia[id][3])
            delete this.tebakkimia[id]
        } else if (similarity(m.text.toLowerCase(), json.unsur.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            m.reply(`*Salah!*`)
    }
    return !0
}

export const exp = 0