import { isUrl } from '../../lib/func.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Just type query what u need :\nUsage : *${usedPrefix + command} step mother*\n\nFor show info / download link :\nUsage : *${usedPrefix + command} xvideos_url*`
	if (isUrl(text)) {
		try {
			let anu = await (await fetch(`https://oni-chan.my.id/api/adults/xvideos-download?link=${text}&apikey=kurumi-tosaka`)).json()
			if (!anu.status) throw Error()
			anu = anu.result.result
			let txt = `*${anu.title}*\n\n`
			+ `*views :* ${anu.views}\n`
			+ `*vote :* ${anu.vote}\n`
			+ `*likes :* ${anu.likes}\n`
			+ `*dislikes :* ${anu.deslikes}\n`
			+ `*url :* _${anu.url}_`
			await conn.sendMsg(m.chat, { image: { url: anu.thumb }, caption: txt }, { quoted : m }).catch(_ => m.reply(txt))
		} catch (e) {
			console.log(e)
			throw 'invalid url / server down.'
		}
	} else {
		try {
			let anu = await (await fetch(`https://oni-chan.my.id/api/adults/xvideos-search?q=${text}&apikey=kurumi-tosaka`)).json()
			if (!anu.status) throw Error()
			anu = anu.result
			let txt = `Found : *${text}*`
			for (let x of anu) {
				txt += `\n\n*${x.title}*\n`
				+ `*duration :* ${x.duration}\n`
				+ `*quality :* ${x.quality}\n`
				+ `_${x.url}_\n`
				+ `───────────────────`
			}
			await conn.sendMsg(m.chat, { image: { url: anu[0].thumb }, caption: txt }, { quoted : m }).catch(_ => m.reply(txt))
		} catch (e) {
			console.log(e)
			m.reply(`No Result Found.`)
		}
	}
}

handler.menunsfw = ['xvideos <query>', 'xvideosweb <xvideos_link>']
handler.tagsnsfw = ['search']
handler.command = /^(xvideos?(web|search|dl)?)$/i

handler.premium = true
handler.limit = true
handler.nsfw = true

export default handler