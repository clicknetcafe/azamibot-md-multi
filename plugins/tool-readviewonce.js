import { downloadContentFromMessage } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
	let q = m.quoted ? m.quoted : m
	let type = Object.keys(q.message || q)[0]
	if (!q.message?.[type].viewOnce) throw 'Itu bukan pesan viewOnce'
	let txt = (q.message[type].caption) || ''
	let buffer = await q.download()
	let j = [...txt.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
	await conn.sendFile(m.chat, buffer, '', txt, null, false, { mentions: j, quoted: m })
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^((read)?viewonce|rvo)$/i

export default handler
