import { cSize } from '../../lib/func.js'
import { ytdl, ytdl2 } from '../../lib/scrape.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!(args[0] || '').match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:post)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube post URL.`)
	await conn.sendMsg(m.chat, { react: { text: '⌛', key: m.key } })
	try {
		let anu = await (await fetch(`https://api.siputzx.my.id/api/d/ytpost?url=${args[0]}`)).json()
		if (!anu.error) {
			anu = anu.data
			for (let x of anu.images) {
				await conn.sendFile(m.chat, x)
			}
			await m.reply(anu.content)
		} else m.reply(anu.error)
	} catch (e) {
		console.log(e)
		m.reply(e.message)
	}
}

handler.menudownload = ['ytpost <url>']
handler.tagsdownload = ['search']
handler.command = /^(ytpost)$/i

handler.premium = true
handler.limit = true

export default handler