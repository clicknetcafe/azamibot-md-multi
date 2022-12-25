import fetch from 'node-fetch'

let handler = async (m, { conn, command, text }) => {
	if (!text) return
	try {
		text = command + ' ' + text
		let anu = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=${global.api}&text=${text}`)
		let json = await anu.json()
		if (json.status != '200') throw Error('Something not rights...')
		await m.reply(`*Pertanyaan :* ${text}\n\n*Jawaban :*\n ${json.result}`, null, m.mentionedJid ? { mentions: m.mentionedJid } : {})
	} catch (e) {
		console.log(e)
	}
}

handler.menufun = ['bagaimanakah <text>?']
handler.tagsfun = ['kerang']
handler.command = /^(bagaimana(kah)?)$/i

export default handler