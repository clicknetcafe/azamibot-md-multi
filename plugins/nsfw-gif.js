import db from '../lib/database.js'
import fs from 'fs'
import HMfull from 'hmfull'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	let chat = db.data.chats[m.chat]
	if (!chat.nsfw && m.isGroup) throw `[ *NSFW GAK AKTIF* ]`
	try {
		let hmtai = await HMfull.HMtai.nsfw.gif()
		let buffer = await sticker(false, hmtai.url, packname, author)
		await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
	} catch (e) {
		console.log(e)
		await conn.sendFile(m.chat, fs.readFileSync(`./media/sticker/bronya.webp`), 'sticker.webp', '', m)
	}
}

handler.menunsfw = ['gifnsfw','nsfwgif']
handler.tagsnsfw = ['randommp4']
handler.command = /^(nsfwgif|gifnsfw)$/i

handler.premium = true
handler.limit = true

export default handler