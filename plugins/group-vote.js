let handler = async (m, { conn, usedPrefix, command }) => {
	let id = m.chat
	conn.vote = conn.vote ? conn.vote : {}
	if (!(id in conn.vote)) throw `_*tidak ada voting digrup ini!*_\n\n*${usedPrefix}vote* - untuk memulai vote`
	let isVote = conn.vote[id][1].concat(conn.vote[id][2])
	const wasVote = isVote.includes(m.sender)
	if (wasVote) throw 'Kamu sudah vote!'
	if (/up/i.test(command)) {
		conn.vote[id][1].push(m.sender)
		m.reply(`selesai upvote!\n\n*${usedPrefix}cekvote* untuk melihat list`)
	} else if (/de/i.test(command)) {
		conn.vote[id][2].push(m.sender)
		m.reply(`selesai devote!\n\n*${usedPrefix}cekvote* untuk melihat list`)
	}

}

handler.menugroup = ['vote']
handler.tagsgroup = ['group']
handler.command = /^((up|de)vote)$/i

handler.group = true

export default handler 