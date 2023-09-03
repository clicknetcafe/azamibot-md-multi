// pake lolapi kalo modul brainly error di panel
import { Brainly } from 'brainly-scraper-v2'

Brainly.initialize()
const brain = new Brainly('id')

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Soekarno adalah`
	try {
		let anu = await brain.search(text)
		let txt = '*Result :*'
		for (let x of anu) {
			txt += `\n\n*QUESTION :*\n${x.question.content}\n`
			for (let y of x.question.attachments) {
				txt += `_- ${y}_\n`
			}
			txt += `*ANSWER :*\n${x.answers[0].content}\n`
			for (let y of x.answers[0].attachments) {
				txt += `_- ${y}_\n`
			}
			txt += `───────────────────`
		}
		await m.reply(txt.replace(/(<([^>]+)>)/ig, ''))
	} catch (e) {
		try {
			let anu = await (await fetch(`https://api.lolhuman.xyz/api/brainly?apikey=${api.lol}&query=${text}`)).json()
			if (anu.status != 200) return m.reply('no ingfo')
			let txt = ''
			for (let x of anu.result) {
				txt += `\n\n*QUESTION :*\n${x.question.content}`
				+ `\n*ANSWER :*\n${x.answer.content}`
				+ `\n───────────────────`
			}
			await m.reply(txt.replace(/(<([^>]+)>)/ig, ''))
		} catch (e) {
			console.log(e)
			throw 'informasi tidak tersedia'
		}
	}
}

handler.help = ['brainly <teks>']
handler.tags = ['information']
handler.command = /^(brainly)$/i

handler.premium = true
handler.limit = true

export default handler