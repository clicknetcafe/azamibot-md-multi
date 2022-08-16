let handler = async (m, { conn, text, command, usedPrefix, participants, isAdmin, isOwner }) => {
    if (!text) throw `Example : ${usedPrefix + command} ganti admin baru`
    if (text.length <= 11) throw `Kependekan oi, kalo tagall gak penting mending gausah`
    if (text.includes('chat.whatsapp.com')) throw `Maaf, tidak boleh send link group`
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    m.reply(`${text ? `${text}\n` : ''}┌─「 Tag All 」\n` + users.map(v => '│◦❒ @' + v.replace(/@.+/, '')).join`\n` + '\n└────', null, {
        mentions: users
    })
}

handler.menugroup = ['tagall']
handler.tagsgroup = ['group']
handler.command = ['tagall']

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler
