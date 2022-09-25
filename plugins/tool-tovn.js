import { unlinkSync, readFileSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'

let handler = async (m, { conn, __dirname, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
	if (/audio/.test(mime)) {
		let media = await q.download?.()
		await conn.sendMessage(m.chat, { audio: media, mimetype: 'audio/mpeg', ptt: true }, { quoted: m })
	} else if (/video/.test(mime)) {
		let ran = getRandom('.mp3')
		let filename = join(__dirname, '../tmp/' + ran)
		let media = await q.download(true)
		exec(`ffmpeg -i ${media} -vn -ar 44100 -ac 2 -ab 64k -f mp3 ${filename}`, async (err, stderr, stdout) => {
			await unlinkSync(media)
			if (err) throw `_*Error!*_`
			let buff = await readFileSync(filename)
			await conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg', ptt: true }, { quoted: m })
		})
	} else {
		m.reply(`Reply video/audio with caption *${usedPrefix + command}*`)
	}
}

handler.help = ['tovn (reply)']
handler.tags = ['tools']

handler.command = /^((to)?(vn|ptt))$/i

export default handler

const getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`}