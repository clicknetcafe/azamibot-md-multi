import { pinterest } from '../../lib/scrape.js'
			
let handler = async (m, { conn, text, usedPrefix, command, isPrems }) => {
	if (!text) throw `Example : ${usedPrefix + command} spongebob`
	try {
		let anu = await pinterest(text)
		if (!anu[0]) throw Error()
		await conn.sendMsg(m.chat, { react: { text: '🔍', key: m.key } })
		anu = anu.filter(x => x.image.endsWith('.jpg')).getRandom()
		await conn.sendFile(m.chat, anu.image, '', anu.title || `*Search : ${text.trim()}*`, m)
	} catch (e) {
		console.log(e)
		await conn.sendMsg(m.chat, { image: { url: 'https://api.koboo.my.id/api/search/pinterest?query='+text }, caption: `*Search : ${text.trim()}*` }, { quoted: m }).catch(_ => m.reply('media tidak ditemukan'))
	}
}

handler.help = ['pinterest <teks>']
handler.tags = ['searching']
handler.command = /^(pin(terest2?)?)$/i

export default handler