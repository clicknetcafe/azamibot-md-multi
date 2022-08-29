import db from '../lib/database.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
	let chat = db.data.chats[m.chat]
	if (!chat.nsfw && m.isGroup) throw `[ *NSFW GAK AKTIF* ]`
	try {
		let fimg = await fetch(`https://api.lolhuman.xyz/api/random/nsfw/biganimetiddies?apikey=${global.api}`)
		if (!fimg.ok) throw new e()
		let fimgb = Buffer.from(await fimg.arrayBuffer())
		conn.sendButton(m.chat, `_Random pic : Big Anime Tiddies_`, packname + ' - ' + author, fimgb, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
	} catch (e) {
		m.reply(`Terjadi kesalahan, coba lagi nanti.`)
	}
}

handler.menunsfw = ['bigtiddies']
handler.tagsnsfw = ['randompic']
handler.command = /^(bigtiddies|bigtits?)$/i

handler.premium = true
handler.limit = true

export default handler