let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
	text = text.split(`|`)
	if (!text || text.length == 1) throw `Format :\n*${usedPrefix + command} deskripsi|pilih1|pilih2|dst...*\n\nContoh :\n*${usedPrefix + command} rombak admin|iya|tidak*`
	if (text.length > 1 && text.length < 3) throw `[!] Minimal input *2* pilihan!`
	if (text.length > 13) throw `[!] Pilihan terlalu banyak, maksimal *12* !`
	let array = []
	text.slice(1).forEach(function(i) { array.push(i) })
	await conn.sendPoll(m.chat, text[0], array)
}

handler.menugroup = ['poll <desc>|opts1|opts2|etc...']
handler.tagsgroup = ['group']
handler.command = /^((create)?poll(ing)?)$/i

handler.group = true

export default handler