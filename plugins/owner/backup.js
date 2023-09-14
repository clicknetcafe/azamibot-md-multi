import fs from 'fs'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	m.reply(`_[!] Wait, sending database. . ._`)
	try {
		await conn.sendMessage(m.sender, { document: fs.readFileSync('./database.json'), fileName: 'database.json', mimetype: 'application/json' }, { quoted: m })
		await conn.sendMessage(m.sender, { document: await fs.readFileSync('./sessions/creds.json'), fileName: 'creds.json', mimetype: 'application/json' }, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply('terjadi kesalahan, cek logs.')
	}
}

handler.menuowner = ['backup']
handler.tagsowner = ['owner']
handler.command = /^(backup(db|database)?)$/i

handler.owner = true

export default handler