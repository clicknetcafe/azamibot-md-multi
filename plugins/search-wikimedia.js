import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
	if (!text) return m.reply(`Example: *${usedPrefix + command} indonesia*`)
	try {
		let res = await fetch(`https://api.botcahx.biz.id/api/search/wikimedia?text=${encodeURIComponent(text)}&apikey=Admin`)
		let anu = await res.json()
		anu = anu.result[Math.floor(Math.random()*anu.result.length)]
		await conn.sendButton(m.chat, `${command} > ${text}\n\n${anu.title}\n_${anu.source}_`, pauthor, anu.image, [[`⧑ next ${command} ⧑`, `${usedPrefix + command} ${text}`]], m)
	} catch (e) {
		console.log(e)
		m.reply(`No Result Found.`)
	}
}

handler.help = ['wikimedia <text>']
handler.tags = ['searching']
handler.command = /^(wikimedia)$/i

export default handler