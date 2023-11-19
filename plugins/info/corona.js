import { delay, pickRandom, somematch } from '../../lib/func.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	try {
		let test = /global/i.test(text || '') ? 'global' : 'indonesia'
		let anu = await (await fetch(`https://api.lolhuman.xyz/api/corona/${test}?apikey=${api.lol}`)).json()
		let txt = `*corona ${test}*\n`
		if (anu.status != 200) return m.reply(anu.message)
		for (let x of Object.keys(anu.result)) {
			txt += `\n*${x} :* ${anu.result[x]}`
		}
		m.reply(txt)
	} catch (e) {
		console.log(e)
		m.reply('internal server error.')
	}
}

handler.help = ['corona']
handler.tags = ['information']
handler.command = /^((info)?corona)$/i

handler.limit = true

export default handler