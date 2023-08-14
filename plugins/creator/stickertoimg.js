import { spawn } from 'child_process'
import { webp2png } from '../../lib/webp2mp4.js'

let handler = async (m, { conn, command, usedPrefix }) => {
	let q = m.quoted
	try {
		if (q && /sticker/.test(q.mtype)) {
			if (q.isAnimated) return m.reply(`Gunakan *${usedPrefix}tomp4* untuk stiker bergerak`)
			let sticker = await q.download()
			if (!sticker) throw sticker
			let bufs = []
			const [_spawnprocess, ..._spawnargs] = [...(global.support.gm ? ['gm'] : global.support.magick ? ['magick'] : []), 'convert', 'webp:-', 'png:-']
			let im = spawn(_spawnprocess, _spawnargs)
			im.on('error', e => m.reply(format(e)))
			im.stdout.on('data', chunk => bufs.push(chunk))
			im.stdin.write(sticker)
			im.stdin.end()
			im.on('exit', async () => {
				await conn.sendMsg(m.chat, { image: Buffer.concat(bufs), caption: `*DONE*` }, { quoted: m })
			})
		} else return m.reply('Reply / tag Sticker')
	} catch (e) {
		console.log(e)
		let media = await q.download()
		let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0)
		await conn.sendMsg(m.chat, { image: out, caption: `*DONE*` }, { quoted: m })
	}
}

handler.help = ['toimg']
handler.tags = ['tools']
handler.command = /^(toim(g|age))$/i

export default handler