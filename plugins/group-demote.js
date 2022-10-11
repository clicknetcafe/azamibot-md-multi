let handler = async (m, { conn }) => {
	let who = m.quoted ? m.quoted.sender : m.mentionedJid ? m.mentionedJid[0] : ''
	if (!who || who.includes(conn.user.jid)) throw `*quote / @tag* salah satu !`
	try {
		await conn.groupParticipantsUpdate(m.chat, [who], 'demote')
	} catch (e) {
		console.log(e)
	}
}

handler.menugroup = ['demote @tag']
handler.tagsgroup = ['group']
handler.command = /^(demote)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler