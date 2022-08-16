import { generateWAMessageFromContent } from '@adiwajshing/baileys'

let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
  if (!text) throw `Example : ${usedPrefix + command} ayo mabar`
  if (text.length <= 11) throw `Kependekan oi, kalo ${command} gak penting mending gausah`
  if (text.includes('chat.whatsapp.com')) throw `Maaf, tidak boleh send link group`
  let users = participants.map(u => conn.decodeJid(u.id))
  let q = m.quoted ? m.quoted : m
  let c = m.quoted ? m.quoted : m.msg
  const msg = conn.cMod(m.chat,
    generateWAMessageFromContent(m.chat, {
      [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? c.toJSON() : {
        text: c || ''
      }
    }, {
      quoted: m,
      userJid: conn.user.id
    }),
    text || q.text, conn.user.jid, { mentions: users }
  )
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}
handler.menugroup = ['pengumuman', 'hidetag'].map(v => v + ' <teks>')
handler.tagsgroup = ['group']
handler.command = /^(pengumuman|announce|hiddentag|hidetag)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler

