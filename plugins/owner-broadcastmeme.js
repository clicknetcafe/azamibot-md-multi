import Connection from '../lib/connection.js'
import { randomBytes } from 'crypto'

function ranNumb(min = null, max = null) {
	if (max !== null) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} else {
		return Math.floor(Math.random() * min) + 1
	}
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let chats = await Object.entries(Connection.store.chats).filter(([_, chat]) => chat.isChats && !_.startsWith('212')).map(v => v[0])
	let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) || /video/g.test(mime)) {
		if (!text) throw `teks nya mana ?`
		let img = await q.download?.()
		conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m)
		let wkt
		for (let id of chats) {
			try {
				await conn.sendFile(id, img, '', `${text}\n\n_*「 Just BC-Bot 」*_`)
				wkt = ranNumb(3000, 7000)
				await delay(wkt)
			} catch (e) {
				console.log(e)
			}
		}
		m.reply('Selesai Broadcast All Chat :)')
	} else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
}
handler.menugroup = ['bcmeme'].map(v => v + ' <teks>')
handler.tagsgroup = ['owner']
handler.command = /^((broadcast|bc)meme)$/i

handler.owner = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)
const delay = time => new Promise(res => setTimeout(res, time))