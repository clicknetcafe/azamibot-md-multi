import { downloadContentFromMessage } from '@adiwajshing/baileys'

let handler = async (m, { conn }) => {
	if (!m.quoted) throw 'Quote pesan viewOnce'
	if (m.quoted.mtype != 'viewOnceMessageV2') throw 'Itu bukan pesan viewOnce'
	let txt = (m.quoted.message['imageMessage'] ? m.quoted.message.imageMessage.caption : m.quoted.message.videoMessage.caption) || ''
	let buffer = await m.quoted.download()
	let j = [...txt.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
	await conn.sendFile(m.chat, buffer, '', txt, null, false, { mentions: j, quoted: m })
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^((read)?viewonce|rvo)$/i

export default handler
