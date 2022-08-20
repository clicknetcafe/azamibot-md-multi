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
	let chats = Object.entries(Connection.store.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
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
					/*conn.sendHydrated(id, `_*「 BroadCast-Bot 」*_\n\n${text}`, packname + ' - ' + author, img, 'https://chat.whatsapp.com/CXhNwLK5cijJl5HPRFisNh', 'Minimalist ツ Sweet', null, null, [
						['Premium', '.premium'],
						['Contact', '.owner'],
						['⦿ ALL MENU ⦿', '.menuall']
					])*/
					conn.sendButton(id, `_*「 BroadCast-Bot 」*_\n\n${text}`, packname + ' - ' + author, img, [
						[`👥 Owner`, `.owner`],
						[`🤖 All Menu`, `.allmenu`]
					])
					wkt = ranNumb(2000, 5500)
					await delay(wkt)
				} catch (e) {
					console.log(e)
				}
			}
			m.reply('Selesai Broadcast All Group Chat :)')
		} else {
				m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
		}
}

handler.menugroup = ['broadcastgroup'].map(v => v + ' <teks>')
handler.tagsgroup = ['owner']
handler.command = /^((bc|broadcast)groups?|bcgc?)$/i

handler.owner = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)
const delay = time => new Promise(res => setTimeout(res, time))