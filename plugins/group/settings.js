let handler = async (m, { conn, args, usedPrefix, command }) => {
	let isClose = { // Switch Case Like :v
		'open': 'not_announcement',
		'close': 'announcement',
	}[(args[0] || '')]
	if (isClose === undefined)
		throw `
*Contoh Penggunaan :*
  *○ ${usedPrefix + command} close*
  *○ ${usedPrefix + command} open*
`.trim()
	await conn.groupSettingUpdate(m.chat, isClose)
}

handler.menugroup = ['group *open / close*']
handler.tagsgroup = ['group']
handler.command = /^(gro?up)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler
