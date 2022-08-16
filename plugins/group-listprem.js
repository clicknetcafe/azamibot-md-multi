let handler = async (m, { conn, isPrems }) => {
	if (!isPrems) return m.reply(`「 PREMIUM USER ONLY 」`)
	let prem = global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)
	conn.reply(m.chat, `「 List Premium 」` + `\n` + prem.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, m, { contextInfo: { mentionedJid: prem } })
}

handler.menugroup = ['listprem']
handler.tagsgroup = ['group']
handler.command = /^(listprem|premlist)$/i

export default handler