import db from '../../lib/database.js'

let handler = async (m, { conn, usedPrefix, command, text, isBotAdmin }) => {
	let gc, groups, dt = db.data.chats
	try {
		gc = await conn.groupFetchAllParticipating()
		if (/f(ilter)?/i.test(text)) { // community not included
			for (let x of Object.keys(gc))
				if (gc[x].isCommunity || gc[x].isCommunityAnnounce)
					delete gc[x]
		}
		groups = Object.values(gc).map(v => v.id)
	} catch { return }
	let x, y, timer, name, sisa, array = []
	let txt = `*LIST GROUP : ${groups.length}*`
	for (let x of groups) {
		try {
			timer = (dt[x].joindate + dt[x].joincd) - new Date()
			txt += `\n\n*Group : ${gc[x].subject}*
*id :* ${gc[x].id}
*Members :* ${gc[x].participants.length}
*Created :* ${new Date(gc[x].creation * 1000).toDateString()}
*Total Admin :* ${gc[x].participants.filter(v => v.admin == 'admin').length}
*isBotAdmin :* ${gc[x].participants.filter(v => v.id == conn.user.jid && v.admin == 'admin').length == 0 ? 'No' : 'Yes'}
*Ephemeral :* ${gc[x].ephemeralDuration ? `${gc[x].ephemeralDuration / 86400} Day(s)` : 'Off'}
*Edit Group Info :* ${gc[x].restrict ? 'Only Admins' : 'All Participants'}
*Send Messages :* ${gc[x].announce ? 'Only Admins' : 'All Participants'}
*Durasi :* ${timer <= 0 ? 'Tanpa Batas Waktu' : `${timer.toTimeString()}`}
───────────────────`
		} catch (e) {console.log(e) }
	}
	await m.reply(txt)
}

handler.menugroup = ['groups', 'grouplist']
handler.tagsgroup = ['group']
handler.command = /^((gro?ups?|gc)list|list(gro?ups?|gc))$/i

export default handler