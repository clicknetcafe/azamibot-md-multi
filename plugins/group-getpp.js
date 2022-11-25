let handler = async(m) => {
	let who
	if (m.isGroup) who = m.quoted ? m.quoted.sender : m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
	else who = m.sender
	try {
		let url = await conn.profilePictureUrl(who, 'image')
		await conn.sendMessage(m.chat, { image: { url: url }, caption: `pp from @${who.split`@`[0]}`, mentions: [who] }, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply(`Gagal mengambil pp user.`)
	}
}

handler.menugroup = ['getprofile @tag']
handler.tagsgroup = ['group']
handler.command = /^(get(pp|profile)(user)?)$/i

handler.group = true

export default handler