import { delay,ranNumb } from '../../lib/func.js'

let handler = async(m, { conn, text, usedPrefix, command, isPrems }) => {
	if (!text) throw `Example: ${usedPrefix + command} https://vt.tiktok.com/ZSFWGxdLm/`
	if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url invalid, please input a valid url. Try with add http:// or https://`)
	if (!text.includes('tiktok.com')) return m.reply(`Invalid Tiktok URL.`)
	try {
		let anu = await (await fetch(`https://api.lolhuman.xyz/api/tiktokslide?apikey=${api.lol}&url=${text}`)).json()
		if (anu.status == '200') {
			anu = anu.result
			if (anu.length == 0) return m.reply(`invalid slideshow url / media isn't available.`)
			let c = 0, d = anu.length
			if (!isPrems && anu.length > 7) {
				anu = anu.slice(0, 7)
				await conn.reply(m.sender, `_[!] (bukan user premium)_ limit maksimal 6 Slide.`, m)
			}
			for (let x of anu) {
				if (c == 0) await conn.sendMsg(m.chat, { image: { url: x }, caption: `Mengirim 1 dari ${anu.length} slide gambar.\n_(Sisanya akan dikirim via chat pribadi.)_` }, { quoted : m })
				else await conn.sendMsg(m.sender, { image: { url: x } })
				c += 1
				await delay(isPrems ? ranNumb(700, 1000) : ranNumb(800, 1500))
			}
		} else m.reply(anu.message)
	} catch (e) {
		console.log(e)
		m.reply('internal server error.')
	}
}

handler.menudownload = ['tiktokslide <url>']
handler.tagsdownload = ['search']
handler.command = /^((tt|tiktok)slide)$/i

handler.premium = true
handler.limit = true

export default handler