import { truth, dare } from '@bochilteam/scraper'

let handler = async (m, { conn, usedPrefix, command }) => {
	let anu = await (/dare/g.test(command) ? dare : truth)()
	m.reply(anu)
}

handler.help = ['truth','dare']
handler.tags = ['entertainment']
handler.command = /^(truth|dare)$/i

handler.limit = true
handler.group = true

export default handler