let handler = async (m, { conn }) => {
	let who = m.quoted ? m.quoted.sender : m.mentionedJid ? m.mentionedJid[0] : ''
	if (!who || who.includes(conn.user.jid)) throw `*quote / @tag* salah satu !`
	try {
		await conn.groupParticipantsUpdate(m.chat, [who], 'promote')
		await conn.sendMessage(m.chat, { text: `Sukses, @${who.replace(/@s\.whatsapp\.net/g, '')} sekarang Admin.`, mentions: [who] }, { quoted: fkontak })
	} catch (e) {
		console.log(e)
	}
}

handler.menugroup = ['promote @tag']
handler.tagsgroup = ['group']
handler.command = /^(promote)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler