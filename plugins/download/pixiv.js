import { delay, ranNumb } from '../../lib/func.js'

let handler = async(m, { conn, text, usedPrefix, command, isPrems }) => {
	if (!text) return m.reply(`*Usage : ${usedPrefix + command} id*\n\nExample :\n${usedPrefix + command} 63456028`)
	try {
		let anu = await (await fetch(`https://api.lolhuman.xyz/api/pixivdl/${text.trim()}?apikey=${api.lol}`)).json()
		if (anu.status != 200) return m.reply(anu.message)
		anu = anu.result
		let tit = `${anu.title}\n( id : ${anu.id} )`
		let c = 0, d = anu.images
		if (!isPrems && d.length > 7) {
			d = d.slice(0, 7)
			await conn.reply(m.sender, `_[!] (bukan user premium)_ limit maksimal 6 Media.`, m)
		}
		for (let x of d) {
			if (c == 0) await conn.sendMsg(m.chat, { image: { url: x }, caption: `${tit}\n\nMengirim 1 dari ${d.length} gambar.\n_(Sisanya akan dikirim via chat pribadi.)_` }, { quoted : m })
			else await conn.sendMsg(m.sender, { image: { url: x } })
			c += 1
			await delay(isPrems ? ranNumb(700, 1000) : ranNumb(800, 1500))
		}
	} catch (e) {
		console.log(e)
		throw 'server down'
	}
}

handler.menudownload = ['pixivdl <id>']
handler.tagsdownload = ['search']
handler.command = /^(pixiv(dl|download))$/i

handler.premium = true
handler.limit = true

export default handler