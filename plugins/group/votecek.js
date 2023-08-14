let handler = async (m, { conn, usedPrefix }) => {
	let id = m.chat
	conn.vote = conn.vote ? conn.vote : {}
	if (!(id in conn.vote)) throw `_*tidak ada voting digrup ini!*_\n\n*${usedPrefix}mulaivote* - untuk memulai vote`
	
	let [reason, upvote, devote] = conn.vote[id]
	let mentionedJid = [...upvote, ...devote]
	m.reply(
`*「 VOTE 」*

*${reason}*

┌〔 UPVOTE 〕
│
├ Total: ${upvote.length}
${upvote.map(u => '├ @' + u.split('@')[0]).join('\n')}
│ 
└────

┌〔 DEVOTE 〕
│ 
├ Total: ${devote.length}_
${devote.map(u => '├ @' + u.split('@')[0]).join('\n')}
│ 
└────

*${usedPrefix}hapusvote* - untuk menghapus vote

_© ${pauthor}_
`.trim(), false, { contextInfo: { mentionedJid } })
}

handler.menugroup = ['cekvote']
handler.tagsgroup = ['group']
handler.command = /^(cekvote)$/i

handler.group = true

export default handler 
