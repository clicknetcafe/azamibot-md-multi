import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
	text = text.split('|')
	let gc, groups, dt = db.data.chats
	try {
		gc = await conn.groupFetchAllParticipating()
		groups = Object.values(await conn.groupFetchAllParticipating()).map(v => v.id)
	} catch { return }
	let x, y, timer, name, sisa, array = []
	for (let x of groups) {
		try {
			timer = (dt[x].joindate + dt[x].joincd) - new Date()
			name = await conn.getName(x)
			sisa = timer <= 0 ? 'Bot Join Tanpa Batas Waktu' : `Durasi : ${timer.toTimeString()}`
			await array.push({ title: `✨ ${name}`, rowId: `${usedPrefix + command} |${x}`, description: sisa })
		} catch (e) { console.log(e) }
	}
	if (array.length == 0) array = [{ title: 'Tidak Ada Grup'}]
	let sections = [{ title: `━ ━ ━ ━ 『 List Group 』 ━ ━ ━ ━`, rows: array }]
	let listMessage = {
		text: `*Request From :* @${m.sender.split`@`[0]}\n\n*Total : ${groups.length} Groups*`,
		mentions: [m.sender],
		footer: pauthor,
		title: `━ ━ 『 *LIST GROUP* 』 ━ ━`,
		buttonText: `Group List`,
		sections
	}
	if (text[1]) {
		x = gc[text[1]]
		try {
			let txt = `*Group : ${x.subject}*\n\n`
			txt += `*Owner :* ${x.owner ? '@' + x.owner.split('@')[0] : 'Unknown'}\n`
			txt += `*id :* ${x.id}\n`
			txt += `*Members :* ${x.participants.length}\n`
			txt += `*Created :* ${new Date(x.creation * 1000).toDateString()}\n`
			txt += `*Total Admin :* ${x.participants.filter(v => v.admin == 'admin').length}\n`
			txt += `*isBotAdmin :* ${x.participants.filter(v => v.id == conn.user.jid && v.admin == 'admin').length == 0 ? 'No' : 'Yes'}\n`
			txt += `*Ephemeral :* ${x.ephemeralDuration ? `${x.ephemeralDuration / 86400} Day(s)` : 'Off'}\n`
			txt += `*Edit Group Info :* ${x.restrict ? 'Only Admins' : 'All Participants'}\n`
			txt += `*Send Messages :* ${x.announce ? 'Only Admins' : 'All Participants'}\n`
			txt += `_last group name changed by ${x.subjectOwner ? '@' + x.subjectOwner.split('@')[0] : 'Unknown'} on ${new Date(x.subjectTime * 1000).toDateString()}_\n\n`
			txt += `*Description :*\n${x.desc ? x.desc.toString().replace(/chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/g, '#HIDDENbyDefault') : 'None'}`
			y = [...txt.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
			await conn.sendMessage(m.chat, { text: txt, mentions: y }, { quoted: m })
		} catch (e) { console.log(e) }
	} else await conn.sendMessage(m.chat, listMessage, { quoted : m })
}

handler.menugroup = ['groups', 'grouplist']
handler.tagsgroup = ['group']
handler.command = /^((gro?ups?|gc|sewa(bot)?)list|list(gro?ups?|gc|sewa(bot)?))$/i

export default handler