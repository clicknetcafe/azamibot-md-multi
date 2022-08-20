let handler = async(m) => {
	let who
	if (m.isGroup) who = m.quoted ? m.quoted.sender : m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
	else who = m.sender
	try {
		let url = await conn.profilePictureUrl(who, 'image')
		await conn.sendFile(m.chat, url, 'profile.jpg', `pp from @${who.split`@`[0]}`, m, null, { mentions: [who]})
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