import fs from 'fs'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	m.reply(`_[!] Wait, sending database. . ._`)
	try {
		let database = await fs.readFileSync(`./database.json`)
		let session = await fs.readFileSync(`./sessions/creds.json`)
		await conn.sendFile(m.sender, database, `database.json`, '', m, false, { asDocument: true, mimetype: 'application/json' })
		await conn.sendFile(m.sender, session, `creds.json`, '', m, false, { asDocument: true, mimetype: 'application/json' })
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan, coba lagi.`)
	}
}

handler.menuowner = ['backup']
handler.tagsowner = ['owner']
handler.command = /^(backup(db|database)?)$/i

handler.owner = true

export default handler