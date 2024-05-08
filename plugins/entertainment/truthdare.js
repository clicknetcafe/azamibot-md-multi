import { truth, dare } from '@bochilteam/scraper'

let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let anu = await (/dare/g.test(command) ? dare : truth)()
		m.reply(anu)
	} catch (e) {
		console.log(e)
		m.reply('try again')
	}
}

handler.help = ['truth','dare']
handler.tags = ['entertainment']
handler.command = /^(truth|dare)$/i

handler.limit = true
handler.group = true

export default handler