import db from '../../lib/database.js'

const cooldown = 86400000
const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))

let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	if (!args[0] && !/list/.test(command)) return m.reply(`Example:\n${usedPrefix+command} durasi_hari`)
	let dt = db.data.chats
	let gcid = m.isGroup ? m.chat : (args[1] || '')
	if (!gcid.endsWith('@g.us') && !/list/.test(command)) return m.reply('Invalid Group ID!.')
	switch (command) {
		case 'listsewa':
			let gc = await conn.groupFetchAllParticipating()
			let groups = Object.values(gc).map(v => v.id)
			let txt = `*LIST GROUP SEWABOT :*`
			for (let x of groups) {
				try {
					let timer = (dt[x].joindate + dt[x].joincd) - new Date()
					if (timer <= 0) continue
					txt += `\n\n*Group : ${gc[x].subject}*`
						+ `\n*id :* ${gc[x].id}`
						+ `\n*Members :* ${gc[x].participants.length}`
						+ `\n*Created :* ${new Date(gc[x].creation * 1000).toDateString()}`
						+ `\n*Total Admin :* ${gc[x].participants.filter(v => v.admin == 'admin').length}`
						+ `\n*isBotAdmin :* ${gc[x].participants.filter(v => v.id == conn.user.jid && v.admin == 'admin').length == 0 ? 'No' : 'Yes'}`
						+ `\n*Ephemeral :* ${gc[x].ephemeralDuration ? `${gc[x].ephemeralDuration / 86400} Day(s)` : 'Off'}`
						+ `\n*Edit Group Info :* ${gc[x].restrict ? 'Only Admins' : 'All Participants'}`
						+ `\n*Send Messages :* ${gc[x].announce ? 'Only Admins' : 'All Participants'}`
						+ `\n*Durasi :* ${timer.toTimeString()}`
						+ `\n───────────────────`
				} catch (e) {console.log(e) }
			}
			await m.reply(txt)
			break
		case 'addsewa':
		case 'editsewa':
			if (!dt[gcid]) return 'Group not in Database!'
			let expired = Math.floor(Math.min(999, Math.max(1, isNumber(args[0]) ? parseInt(args[0]) : 1)))
			dt[gcid].expired = +new Date() + expired * cooldown
			dt[gcid].joindate = new Date * 1
			dt[gcid].joincd = expired * cooldown
			await m.reply(`*Durasi Sewa Bot : ${expired} Hari*\n\nid: ${gcid}\nname: ${await conn.getName(gcid)}`)
			break
		case 'delsewa':
		case 'deletesewa':
			if (!dt[gcid]) return 'Group not in Database!'
			dt[gcid].expired = 0
			dt[gcid].joindate = 0
			dt[gcid].joincd = 0
			await m.reply(`*Durasi Sewa Bot Dihapus*\n\nid: ${gcid}\nname: ${await conn.getName(gcid)}`)
			break
		default:
			return m.reply('tes')
	}
}

handler.menuowner = ['list','add','edit','del'].map(v => v+'sewa')
handler.tagsowner = ['owner']
handler.command = /^((list|add|edit|del(ete)?)sewa(bot)?)$/i

handler.rowner = true

export default handler