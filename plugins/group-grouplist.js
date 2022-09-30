let handler = async (m, { conn, isOwner }) => {
	let groups = Object.values(await conn.groupFetchAllParticipating())
	let txt = `*GROUPS LIST*\n\n*Total:* ${groups.length}`
	for (let i = 0; i < groups.length; i++) {
		txt += `\n\n*⭔ Subject :* ${groups[i].subject}\n`
		txt += `*⭔ Owner :* ${groups[i].owner ? "@" + groups[i].owner.split("@")[0] : "Unknown"}\n`
		txt += `*⭔ ID :* ${groups[i].id}\n`
		txt += `*⭔ Members :* ${groups[i].participants.length}${!!groups[i].participants.find(v => v.id == conn.user.jid).admin ? ' [ BotAdmin ]' : ''}\n`
		txt += `*⭔ Created :* ${new Date(groups[i].subjectTime* 1000).toDateString()}\n`
		txt += `───────────────────`
	}
	let users = groups.map(u => u.owner).filter(v => v !== conn.user.jid)
	m.reply(txt.trim().replace(/@s\.whatsapp\.net/g, ''), null, { mentions: users })
}

handler.menugroup = ['groups', 'grouplist']
handler.tagsgroup = ['group']
handler.command = /^((gro?ups?list)|(listgro?ups?)|(listgc))$/i

export default handler