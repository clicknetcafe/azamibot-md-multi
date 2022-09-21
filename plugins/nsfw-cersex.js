import db from '../lib/database.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let chat = db.data.chats[m.chat]
	if (!chat.nsfw && m.isGroup) throw `[ *NSFW GAK AKTIF* ]`
	try {
		let res = await fetch(`https://docs-jojo.herokuapp.com/api/cersex`)
		let json = await res.json()
		let unicodeString = "http\\u00253A\\u00252F\\u00252Fexample.com\u{1F4A9}\x61";
		await conn.sendFile(m.chat, json.result.img, '', `*${json.result.judul}*\n\n${decodeURIComponent(JSON.parse('"' + json.result.cersex.replace(/\"/g, '\\"') + '"'))}`, m)
	} catch (e) {
		console.log(e)
		try {
			let res = await fetch(`https://api.akuari.my.id/asupan/cersex`)
			let json = await res.json()
			await conn.sendFile(m.chat, json.img, '', `${json.hasil}`, m)
		} catch (e) {
			console.log(e)
			m.reply(`Terjadi kesalahan, coba lagi nanti.`)
		}
	}
}

handler.menunsfw = ['cersex']
handler.tagsnsfw = ['search']
handler.command = /^(cersex)$/i

handler.premium = true
handler.limit = true

export default handler