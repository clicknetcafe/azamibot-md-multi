let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
	if (!m.quoted) return
	let { chat, fromMe } = m.quoted
	if (!fromMe && isAdmin && isBotAdmin) await conn.sendMsg(chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender } })
	else await conn.sendMsg(chat, { delete: m.quoted.vM.key })
}

handler.menugroup = ['del', 'delete']
handler.tagsgroup = ['group']
handler.command = /^(d(el(ete)?)?)$/i

export default handler