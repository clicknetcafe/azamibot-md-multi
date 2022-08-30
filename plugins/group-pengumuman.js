import { generateWAMessageFromContent } from '@adiwajshing/baileys'

let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
  if (!text) throw `Example : ${usedPrefix + command} ayo mabar`
  if (text.includes('chat.whatsapp.com')) throw `Maaf, tidak boleh send link group`
  conn.sendMessage(m.chat, { text: text, mentions: participants.map(a => a.id) })
}

handler.menugroup = ['hidetag'].map(v => v + ' <teks>')
handler.tagsgroup = ['group']
handler.command = /^(pengumuman|announce|hidd?en?tag)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler