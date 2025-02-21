import db from '../../lib/database.js'
import { parsePhoneNumber } from 'awesome-phonenumber'
import { xpRange } from '../../lib/levelling.js'

let handler = async (m, { conn, isPrems, text }) => {
	let who = text ? (text.replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : m.quoted ? m.quoted.sender : m.mentionedJid?.[0] ? m.mentionedJid[0] : m.sender
	try {
		let pp, user = await db.data.users
		if (!isPrems && (user[m.sender].level < user[who].level)) return m.reply(`[!] Gagal, level target lebih tinggi.`)
		try {
			pp = await conn.profilePictureUrl(who, 'image')
		} catch {
			pp = './src/avatar_contact.png'
		}
		let about = (await conn.fetchStatus(who).catch(console.error) || {}).status || ''
		let { name, limit, exp, lastclaim, money, level, role } = user[who]
		let { min, xp, max } = xpRange(level, global.multiplier)
		let username = await(conn.getName(who))
		let str = `*${username ? username.replaceAll('\n','') : '-'}* (@${who.replace(/@.+/, '')})\n\n`
		str += `${about ? `*About :* ${about.replaceAll('\n','')}\n` : ''}`
		str += `*Number :* ${parsePhoneNumber('+'+who.replace('@s.whatsapp.net', '')).number.international}\n`
		str += `*Link :* https://wa.me/${who.split`@`[0]}\n`
		str += `*Level :* ${level}\n`
		str += `*Role :* ${role}\n`
		str += `*EXP :* ${exp} (${exp - min} / ${xp})\n`
		str += `*Money :* ${money}\n`
		let who2 = who.split`@`[0]
		let list = [...db.data.datas.prems.filter(v => v.user !== '').map(v => v.user), ...db.data.datas.rowner.map(v => v[0]+'@s.whatsapp.net'), ...db.data.datas.owner.map(v => v[0]+'@s.whatsapp.net'), conn.user.jid]
		str += `*Limit :* ${list.includes(who) ? '~ Infinity ~' : limit}\n`
		str += `${lastclaim > 0 ? `\n*Last Claim :* ${new Date(lastclaim)}` : ''}`
		await conn.sendMsg(m.chat, { image: { url: pp, fileName: 'pp.jpg'}, caption: str, mentions: [who]}, { quoted: m})
	} catch (e) {
		console.log(e)
		m.reply(`[!] User tidak ada dalam database.`)
	}
}

handler.menufun = ['profile']
handler.tagsfun = ['rpg']
handler.command = /^(profile?)$/i

export default handler