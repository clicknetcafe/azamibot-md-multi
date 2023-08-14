import db from '../../lib/database.js'
import { format } from 'util'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (/list/.test(command)) {
		let list = await Object.keys(db.data.chats)
		let list2 = Object.keys(db.data.users)
		let txt = `*List Unused Groups*\n${format(list.filter(v => !v.endsWith('@g.us')))}\n\n`
		txt += `*List Unused Users*\n${format(list2.filter(v => !v.endsWith('@s.whatsapp.net')))}`
		m.reply(txt)
	} else {
		let list = Object.keys(db.data.users)
		let listgc = Object.keys(db.data.chats)
		for (let x of list) { if (!x.endsWith('@s.whatsapp.net')) delete db.data.users[x] }
		for (let x of listgc) { if (!x.endsWith('@g.us')) delete db.data.chats[x] }
		await m.reply('succes delete all unused data')
	}
}

handler.menuowner = ['cleandb','cleandblist']
handler.tagsowner = ['ownerr']
handler.command = /^(cleandb(list)?)$/i

handler.rowner = true

export default handler