import db from '../../lib/database.js'

let handler = async (m, { conn, usedPrefix, command, text, args, isAdmin, participants, groupMetadata }) => {

const getGroupAdmins = (participants) => {
	let admins = []
	for (let i of participants) {
		i.admin === "admin" ? admins.push(i.id) : ''
	}
		return admins
	}
	if (!isAdmin && !text) return m.reply(`Jelaskan ada urusan apa ?\n\nContoh : *${usedPrefix + command} lapor ada yang spam*`)
	if (!isAdmin && (text.length <= 11 || args.length < 4)) throw `Kependekan oi, kalo gak penting mending gausah`
	let pp = './src/avatar_contact.png'
	try {
		let q = m.quoted ? m.quoted : m
		let mime = (q.msg || q).mimetype || q.mediaType || ''
		if (/video|image/g.test(mime) && !/webp/g.test(mime)) pp = await q.download()
		else pp = await conn.profilePictureUrl(m.chat, 'image')
	} catch (e) {
	} finally {
		let { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink } = db.data.chats[m.chat]
		const groupAdmins = getGroupAdmins(participants)
		const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net' || 'Unknown'
		let listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.split('@')[0]}`).join('\n')
		let teks = `*「 TAG ADMIN 」*\n\n${text ? `[ PESAN ]\n" ${text} "\n\n` : m.quoted?.text ? `[ PESAN ]\n" ${m.quoted.text} "\n\n` : ''}*Group Owner :* @${owner.replace(/@s\.whatsapp\.net/g, '')}\n*Group Admins :*\n${listAdmin}`.trim()
		let ownernya = [owner]
		let mentionedJid = groupAdmins.concat(ownernya)
		await conn.sendFile(m.key.remoteJid, pp, 'pp.jpg', teks, m, false, { contextInfo: { mentionedJid } })
	}
}

handler.menugroup = ['tagadmin']
handler.tagsgroup = ['group']
handler.command = /^((tag|list)admins?)$/i

handler.group = true

export default handler