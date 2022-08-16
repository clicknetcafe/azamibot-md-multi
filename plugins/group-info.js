import db from '../lib/database.js'

let handler = async (m, { conn, participants, groupMetadata, isBotAdmin }) => {
	const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
	const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del } = db.data.chats[m.chat]
	const groupAdmins = participants.filter(p => p.admin)
	const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
	const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
	let text = `*「 Group Information 」*\n
*ID :* ${groupMetadata.id}
*Name :* ${groupMetadata.subject}
*Total Members:* ${participants.length} Members

*Description:* 
${groupMetadata.desc?.toString() || 'unknown'}

*Group Owner:* 
@${owner.split('@')[0]}

*Group Admins:*
${listAdmin}

*Group Settings:*
${isBanned ? '✅' : '❌'} Banned
${welcome ? '✅' : '❌'} Welcome
${detect ? '✅' : '❌'} Detect
${del ? '❌' : '✅'} Anti Delete
${antiLink ? '✅' : '❌'} Anti Link

*Message Settings:*
Welcome: ${sWelcome}
Bye: ${sBye}
Promote: ${sPromote}
Demote: ${sDemote}
`.trim()
	conn.sendFile(m.chat, pp, 'pp.jpg', `${isBotAdmin ? text : `${text.replaceAll('chat.whatsapp.com','chat.whatsapp|com')}` }`, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}

handler.menugroup = ['infogrup']
handler.tagsgroup = ['group']
handler.command = /^(info(gro?up|gc)|(gro?up|gc)info)$/i

handler.group = true

export default handler