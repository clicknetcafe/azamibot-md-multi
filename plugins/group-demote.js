let handler = async (m, { conn }) => {
	let who = m.quoted ? m.quoted.sender : m.mentionedJid ? m.mentionedJid[0] : ''
	if (!who || who.includes(conn.user.jid)) throw `*quote / @tag* salah satu !`
	try {
		await conn.groupParticipantsUpdate(m.chat, [who], 'demote')
		await conn.sendMessage(m.chat, { text: `@${who.replace(/@s\.whatsapp\.net/g, '')} sekarang bukan Admin.`, mentions: [who] }, { quoted: fkontak })
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