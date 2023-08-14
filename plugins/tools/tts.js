import gtts from 'node-gtts'
import { readFileSync, unlinkSync } from 'fs'
import { join } from 'path'

const defaultLang = 'id'
let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Example : *${usedPrefix +command} hello world*`
	let lang = args[0]
	let text = args.slice(1).join(' ')
	if ((args[0] || '').length !== 2) {
		lang = defaultLang
		text = args.join(' ')
	}
	if (!text && m.quoted?.text) text = m.quoted.text
	let res
	try { res = await tts(text, lang) }
	catch (e) {
		console.log(e)
		text = args.join(' ')
		if (!text) throw `Use example ${usedPrefix}${command} en hello world`
		res = await tts(text, defaultLang)
	} finally {
		if (res) await conn.sendFile(m.chat, res, '', '', m, true)
	}
}

handler.help = ['tts <lang> <teks>']
handler.tags = ['tools']
handler.command = /^(g?tts)$/i

export default handler

function tts(text, lang = 'id') {
	console.log(lang, text)
	return new Promise((resolve, reject) => {
		try {
			let tts = gtts(lang)
			let filePath = join(global.__dirname(import.meta.url), '../../tmp', (1 * new Date) + '.wav')
			try {
				tts.save(filePath, text, () => {
					resolve(readFileSync(filePath))
					unlinkSync(filePath)
				})
			} catch (e) {
				tts.save(filePath, 'error', () => {
					resolve(readFileSync(filePath))
					unlinkSync(filePath)
				})
			}
		} catch (e) { reject(e) }
	})
}