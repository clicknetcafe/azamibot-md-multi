import db from '../lib/database.js'
import fetch from 'node-fetch'

export async function before(m, { isAdmin, isBotAdmin }) {
	if (m.isGroup && m.text) {
		let chat = db.data.chats[m.chat]
		let res = ['‎','x','z','X','Z','/','i','!','#','$','%','+','£','¢','€','¥','^','°','=','¶','∆','×','÷','π','√','✓','©','®',':',';','?','&','.','-','/'].some(word => m.text.startsWith(word))
		if (chat.simi && m.text.length > 3 && m.text.length < 125 && !res) {
			let user = db.data.users[m.sender]
			if (user.banned) return !0
			let anu = await fetch(`https://simsimi.info/api/?text=${encodeURIComponent(m.text)}&lc=id`)
			let json = await anu.json()
			m.reply(json.message)
		}
	}
	return !0
}