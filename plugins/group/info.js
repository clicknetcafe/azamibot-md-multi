import db from '../../lib/database.js'

let handler = async (m, { conn, text, participants, groupMetadata, isBotAdmin }) => {
	let chatt = text.endsWith('@g.us') ? text : m.chat
	try {
		let pp = await conn.profilePictureUrl(chatt, 'image').catch(_ => null) || './src/avatar_contact.png'
		let { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, viewonce, antivirus, delete: del } = db.data.chats[chatt]
		let x = await conn.groupFetchAllParticipating().then(v => v[chatt])
		let groupAdmins = x.participants.filter(p => p.admin)
		let listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
		let txt = `*Group : ${x.subject}*

*id :* ${x.id}
*Members :* ${x.participants.length}
*Created :* ${new Date(x.creation * 1000).toDateString()}
*Total Admin :* ${x.participants.filter(v => v.admin == 'admin').length}
*isBotAdmin :* ${x.participants.filter(v => v.id == conn.user.jid && v.admin == 'admin').length == 0 ? 'No' : 'Yes'}
*Ephemeral :* ${x.ephemeralDuration ? `${x.ephemeralDuration / 86400} Day(s)` : 'Off'}
*Edit Group Info :* ${x.restrict ? 'Only Admins' : 'All Participants'}
*Send Messages :* ${x.announce ? 'Only Admins' : 'All Participants'}
_last group name changed by ${x.subjectOwner ? '@' + x.subjectOwner.split('@')[0] : 'Unknown'} on ${new Date(x.subjectTime * 1000).toDateString()}_

*Description :*
${x.desc ? x.desc.toString().replace(/chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/g, '#HIDDENbyDefault') : 'None'}

*Group Owner :*
${x.owner ? '@' + x.owner.split('@')[0] : 'Unknown'}

*Group Admins:*
${listAdmin}

*Group Settings:*
${isBanned ? '✅' : '❌'} Banned
${welcome ? '✅' : '❌'} Welcome
${del ? '❌' : '✅'} Anti Delete
${antiLink ? '✅' : '❌'} Anti Link
${viewonce ? '✅' : '❌'} Anti View Once
${antivirus ? '✅' : '❌'} Anti Virtex

*Message Settings:*
*Welcome :* ${sWelcome}
*Bye :* ${sBye}
*Promote :* ${sPromote}
*Demote :* ${sDemote}`
		let y = await conn.parseMention(txt)
		await conn.sendFile(m.chat, pp, '', `${isBotAdmin ? txt : `${txt.replaceAll('chat.whatsapp.com','chat.whatsapp|com')}` }`, m, false, { mentions: y })
	} catch (e) {
		console.log(e)
	}
}

handler.menugroup = ['infogrup']
handler.tagsgroup = ['group']
handler.command = /^(info(gro?up|gc)|(gro?up|gc)info)$/i

handler.group = true

export default handler