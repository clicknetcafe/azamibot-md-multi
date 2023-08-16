// fitur buat bikin status orang yang ditag bakal diteruskan ke nomor ROwner
import db from '../../lib/database.js'
import { somematch } from '../../lib/func.js'

const one = ['true','enable','on','turnon','false','disable','off','turnoff']

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[1] || !somematch(one, args[0])) throw `*Format :*\n${usedPrefix + command} [opts] all / tag / quote\n\n*Example :*\n${usedPrefix + command} on @Alan\n\n*Forward Semua Status :*\n${usedPrefix + command} on all`
	let who, meh, enable = somematch(one.slice(0, 4), args[0])
	let user = db.data.users
	if (args[1] == 'all') {
		if (enable) {
			for (let x of Object.keys(user)) {
				db.data.users[x].viewstatus = enable
			}
		} else {
			for (let x of Object.keys(user)) {
				db.data.users[x].viewstatus = enable
			}
		}
	} else {
		who = args[1]
		if (!who) return m.reply(`tag atau ketik nomornya!`)
		meh = await conn.onWhatsApp(who)
		if (meh.length == 0) return m.reply(`[!] Failed, @${(who.split('@')[0] || '')} bukan pengguna WhatsApp.`, null, { mentions: [who] })
		who = meh[0].jid.split('@')[0]
		db.data.users[meh[0].jid].viewstatus = enable
	}
	let ya = who ? `@${(who || '').replace(/@s\.whatsapp\.net/g, '')}` : 'Semua User'
	let chat = `Forward Status ${ya} telah ${enable ? 'Diaktifkan' : 'Dinonaktifkan'}`
	let sender = `Sekarang update status ${ya} akan otomatis diteruskan ke ROwner`
	let men = meh ? meh[0].jid : ''
	await conn.reply(m.chat, chat, m, men ? { mentions: [men] } : {})
	if (enable) await conn.reply(m.sender, sender, fkontak, men ? { mentions: [men] } : {})
	console.log(db.data.users[conn.user.jid].viewstatus)
}

handler.menuowner = ['forwardstatus']
handler.tagsowner = ['ownerr']
handler.command = /^((view|f(orward)?)status)$/i

handler.rowner = true

export default handler

