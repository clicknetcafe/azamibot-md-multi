import Connection from '../lib/connection.js'
import uploadImage from '../lib/uploadImage.js'
import { randomBytes } from 'crypto'
//import imgbbUploader from 'imgbb-uploader'
import fetch from 'node-fetch'

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
        /*let out = await uploadImage(img)
        const options = { apiKey: global.imgbb, expiration: 3600, imageUrl: out}
        let anu = await imgbbUploader(options)
        let fimg = await fetch(anu.display_url)
	    if (!fimg.ok) throw 'Error Upload Imgbb'
	    let fimgb = Buffer.from(await fimg.arrayBuffer())*/
		conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m)
		let wkt
		for (let id of chats) {
			try {
				await conn.sendFile(id, img, '', `${text}\n\n_*「 Just BC-Bot 」*_`)
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
handler.menugroup = ['bcmemegroup'].map(v => v + ' <teks>')
handler.tagsgroup = ['owner']
handler.command = /^((broadcast|bc)meme(gc|gro?up))$/i

handler.owner = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)
const delay = time => new Promise(res => setTimeout(res, time))