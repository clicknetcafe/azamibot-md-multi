import { downloadContentFromMessage } from '@adiwajshing/baileys'

let handler = async (m, { conn }) => {
	if (!m.quoted) throw 'Quote pesan viewOnce'
	if (m.quoted.mtype != 'viewOnceMessageV2') throw 'Itu bukan pesan viewOnce'
	let msg = m.quoted.message
	let type = Object.keys(msg)[0]
	let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
	let buffer = Buffer.from([])
	for await (const chunk of media) {
		buffer = Buffer.concat([buffer, chunk])
	}
	let j = msg[type].caption ? [...msg[type].caption.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')  : []
	await conn.sendFile(m.chat, buffer, '', msg[type].caption || '', null, false, { mentions: j, quoted: m })
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^((read)?viewonce|rvo)$/i

export default handler
