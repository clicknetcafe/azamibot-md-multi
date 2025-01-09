import { ytdl, ytdl2 } from '../../lib/scrape.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Example: ${usedPrefix + command} https://youtu.be/zcRGPmEawmk`
	if (!args[0].match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	await conn.sendMsg(m.chat, { react: { text: '⌛', key: m.key } })
	try {
		let anu = await ytdl2(args[0]);
		if (!anu.status) throw Error(anu.msg)
		anu = anu.data
		await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: anu.audio }, mimetype: 'audio/mpeg', fileName: `${anu.title}.mp3` }, m, anu.title, anu.thumb, args[0])
	} catch (e) {
		console.log(e)
		try {
			/*const anu = await ytdl(args[0]);
			let aud = anu.resultUrl.audio[0]
			await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: await aud.download() }, mimetype: 'audio/mpeg', fileName: `${anu.result.title}.mp3` }, m, anu.result.title, 'https://i.ibb.co.com/txJrWCZ/images-8.jpg', args[0])*/
			let anu = await (await fetch('https://api.siputzx.my.id/api/d/ytmp3?url='+args[0])).json()
			if (!anu.error) {
				anu = anu.data
				await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: anu.dl }, mimetype: 'audio/mpeg', fileName: `${anu.title}.mp3` }, m, anu.title, 'https://i.ibb.co.com/txJrWCZ/images-8.jpg', args[0])
			} else {
				let anu = await (await fetch('https://api.siputzx.my.id/api/d/ytmp3?url='+args[0])).json()
				if (!anu.error) {
					let anu = await (await fetch('https://api.siputzx.my.id/api/dl/youtube/mp3?url='+args[0])).json()
					if (!anu.error) {
						await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: anu.data }, mimetype: 'audio/mpeg', fileName: `unnamed.mp3` }, m, 'unnamed', 'https://i.ibb.co.com/txJrWCZ/images-8.jpg', args[0])
					} else m.reply(anu.error)
				}
			}
		} catch (e) {
			console.log(e)
			m.reply(e.message)
		}
	}
}

handler.menudownload = ['ytaudio <url>']
handler.tagsdownload = ['search']
handler.command = /^(yt(a(udio)?|mp3))$/i

handler.premium = true
handler.limit = true

export default handler