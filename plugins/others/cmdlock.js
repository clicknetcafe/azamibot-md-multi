import db from '../../lib/database.js'

let handler = async (m, { command }) => {
	if (!m.quoted) throw 'Reply Pesan!'
	if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
	let sticker = db.data.sticker
	let hash = m.quoted.fileSha256.toString('hex')
	if (!(hash in sticker)) throw 'Hash not found in database'
	sticker[hash].locked = !/^un/i.test(command)
	m.reply('Done!')
}

handler.menuowner = ['cmdlock','cmdunlock']
handler.tagsowner = ['owner']
handler.command = /^((un)?lockcmd|cmd(un)?lock)$/i

handler.owner = true

export default handler
