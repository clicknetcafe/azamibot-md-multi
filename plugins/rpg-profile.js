import db from '../lib/database.js'
import PhoneNumber from 'awesome-phonenumber'
import { xpRange } from '../lib/levelling.js'

import PhoneNumber from 'awesome-phonenumber'
import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, isPrems }) => {
	let pp = './src/avatar_contact.png'
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
	try {
		pp = await conn.profilePictureUrl(who, 'image')
	} catch (e) {
		console.log(e)
	} finally {
		let user = await db.data.users
		if (!isPrems && (user[m.sender].level < user[who].level)) return m.reply(`[!] Gagal, level target lebih tinggi.`)
		let about = (await conn.fetchStatus(who).catch(console.error) || {}).status || ''
		let { name, limit, exp, lastclaim, money, level, role } = user[who]
		let { min, xp, max } = xpRange(level, global.multiplier)
		let username = await(conn.getName(who))
		let str = `*${username ? username.replaceAll('\n','') : '-'}* (@${who.replace(/@.+/, '')})\n\n`
		str += `${about ? `*About :* ${about.replaceAll('\n','')}\n` : ''}`
		str += `*Number :* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}\n`
		str += `*Link :* https://wa.me/${who.split`@`[0]}\n`
		str += `*Level :* ${level}\n`
		str += `*Role :* ${role}\n`
		str += `*EXP :* ${exp} (${exp - min} / ${xp})\n`
		str += `*Money :* ${money}\n`
		let who2 = who.split`@`[0]
		str += `*Limit :* ${(global.prems.some(v=>who2.includes(v)) || global.owner.map(v => v[0]).some(x=>who2.includes(x))) ? '~ Infinity ~' : limit}\n`
		str += `${lastclaim > 0 ? `\n*Last Claim :* ${new Date(lastclaim)}` : ''}`
		conn.sendMessage(m.chat, { caption: str, image: { url: pp, fileName: 'pp.jpg'}, mentions: [who]}, { quoted: m})
	}
}
handler.menufun = ['profile']
handler.tagsfun = ['rpg']
handler.command = /^(profile?)$/i

export default handler