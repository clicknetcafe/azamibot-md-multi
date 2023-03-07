import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command, text, isBotAdmin }) => {
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
			await array.push({ title: `✨ ${name}`, rowId: `${usedPrefix}gcinfo ${x}`, description: sisa })
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
	await conn.sendMsg(m.chat, listMessage, { quoted : m })
}

handler.menugroup = ['groups', 'grouplist']
handler.tagsgroup = ['group']
handler.command = /^((gro?ups?|gc|sewa(bot)?)list|list(gro?ups?|gc|sewa(bot)?))$/i

export default handler