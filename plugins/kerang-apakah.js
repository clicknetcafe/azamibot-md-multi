import fetch from 'node-fetch'

let handler = async (m, { command, text }) => {
	if (!text) return
	try {
		text = command + ' ' + text
		let anu = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=${global.api}&text=${text}`)
		let json = await anu.json()
		if (json.status != '200') throw Error('Something not rights...')
		await m.reply(`*Pertanyaan :* ${text}\n\n*Jawaban :*\n ${json.result}`, null, m.mentionedJid ? { mentions: m.mentionedJid } : {})
	} catch (e) {
		console.log(e)
		await m.reply(`*Pertanyaan:* ${command} ${text}\n*Jawaban:* ${['Ya', 'Mungkin iya', 'Mungkin', 'Mungkin tidak', 'Tidak', 'Tidak mungkin'].getRandom()}`.trim(), null, m.mentionedJid ? { mentions: m.mentionedJid } : {})
	}
}

handler.menufun = ['apakah <text>?']
handler.tagsfun = ['kerang']
handler.command = /^(apakah)$/i

export default handler
