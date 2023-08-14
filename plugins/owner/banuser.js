import db from '../../lib/database.js'

let handler = async (m, { conn, text }) => {
	let who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : !m.isGroup ? m.chat : m.quoted ? m.quoted.sender : m.mentionedJid ? m.mentionedJid[0] : ''
	if (!who) throw 'Tag salah satu lah'
	let user = db.data.users[who]
	if (!user) throw `User tidak ada dalam database.`
	if (db.data.datas.rowner.map(([number]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who) || who == conn.user.jid) throw `[ ! ] Tidak dapat ban *real owner*.`
	if (user.bannedcd != 0) return conn.reply(m.chat, `[!] Tidak dapat ban @${(who || '').replace(/@s\.whatsapp\.net/g, '')} karena sudah di *silent*`, m, { mentions: [who] })
	user.banned = true
	user.permaban = true
	user.spamcount = 0
	m.reply(`berhasil banned`)
}

handler.menuowner = ['ban @tag']
handler.tagsowner = ['owner']
handler.command = /^(ban(user)?)$/i

handler.owner = true

export default handler