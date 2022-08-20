let handler = async (m, { conn, text, args, isOwner, participants }) => {
	if (m.quoted) {
		try {
			let user = m.quoted.sender;
			let bio = await conn.fetchStatus(m.quoted.sender)
			m.reply(`[ bio @${(user || '').replace(/@s\.whatsapp\.net/g, '')} ]\n\n${bio.status}`, null, { mentions: [user] })
		} catch (e) {
			console.log(e)
			let user = m.quoted.sender;
			m.reply(`Bio @${(user || '').replace(/@s\.whatsapp\.net/g, '')} di private.`, null, { mentions: [user] })
		}
	} else {
		if (!text) return m.reply(`*@tag* someone!`)
		try {
			let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
			let bio = await conn.fetchStatus(who)
			m.reply(`[ bio @${(who || '').replace(/@s\.whatsapp\.net/g, '')} ]\n\n${bio.status}`, null, { mentions: [who] })
		} catch (e) {
			console.log(e)
			let user = m.mentionedJid[0]
			m.reply(`Bio @${(user || '').replace(/@s\.whatsapp\.net/g, '')} di private.`, null, { mentions: [user] })
		}
	}
}

handler.menugroup = ['getbio @tag']
handler.tagsgroup = ['group']
handler.command = /^(get(about|bio))$/i

handler.group = true

export default handler