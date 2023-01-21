import { somematch, pickRandom } from '../lib/others.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (text) text = text.toLowerCase()
	try {
		if (somematch(['justina','ryujin','rose','blackpink','kpop'], text)) {
			let res = await fetch(`https://raw.githubusercontent.com/clicknetcafe/Database/main/Random%20Image/${text}.json`)
			let anu = pickRandom(await res.json())
			await conn.sendButton(m.chat, `${command} > ${text}`, `_© ${pauthor}_`, anu, [[`⧑ next ${text} ⧑`, `${usedPrefix + command} ${text}`]], m)
		} else if (somematch(['china','vietnam','thailand','indonesia','korea','japan','malaysia'], text)) {
			let res = await fetch(`https://raw.githubusercontent.com/clicknetcafe/Database/main/Cecan/${text}.json`)
			let anu = pickRandom(await res.json())
			await conn.sendButton(m.chat, `${command} > ${text}`, `_© ${pauthor}_`, anu, [[`⧑ next ${text} ⧑`, `${usedPrefix + command} ${text}`]], m)
		} else {
			if (!text || text == 'random') {
				try {
					let fimg = await fetch(`https://api.lolhuman.xyz/api/random/cecan?apikey=${apilol}`)
					let fimgb = Buffer.from(await fimg.arrayBuffer())
					if (Buffer.byteLength(fimgb) < 22000) throw Error('[!] Error : No Buffer.')
					await conn.sendButton(m.chat, `_Random pic: cecan_`, pauthor, fimgb, [[`⧑ next ${command} ⧑`, `${usedPrefix + command} ${text}`]], m)
				} catch (e) {
					console.log(e)
					let res = await fetch(`https://raw.githubusercontent.com/clicknetcafe/Database/main/${pickRandom(['Cecan/cecan','Cecan/cecan2'])}.json`)
					let anu = pickRandom(await res.json())
					await conn.sendButton(m.chat, `${command} > random`, `_© ${pauthor}_`, anu, [[`⧑ next ${text} ⧑`, `${usedPrefix + command} ${text}`]], m)
				}
			} else {
				m.reply(`Mode tersedia :\nrandom | blackpink | china | indonesia | japan | justina | korea | kpop | malaysia | rose | ryujin | thailand | vietnam\n\nContoh penggunaan: *${usedPrefix + command} random*`)
			}
		}
	} catch (e) {
		console.log(e)
		m.reply(`Cecan *${text}* sedang turu.`)
	}
}

handler.help = ['cecan <option>']
handler.tags = ['entertainment']
handler.command = /^(cecan)$/i

handler.premium = true
handler.limit = true

export default handler