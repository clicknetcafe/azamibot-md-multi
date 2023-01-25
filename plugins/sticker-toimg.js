import { spawn } from 'child_process'

let handler = async (m, { conn, usedPrefix }) => {
	if (m.quoted && /sticker/.test(m.quoted.mtype) && !m.quoted.isAnimated) {
		let q = m.quoted
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
			await conn.sendMessage(m.chat, { image: Buffer.concat(bufs), caption: `*DONE*` }, { quoted: m })
		})
	} else if (m.quoted && /sticker/.test(m.quoted.mtype) && m.quoted.isAnimated) {
		return m.reply(`yah gagal\nCoba gunakan *${usedPrefix}tomp4* untuk stiker bergerak`)
	} else throw 'Reply / tag Sticker'
}

handler.help = ['toimg']
handler.tags = ['tools']
handler.command = /^(toim(g|age))$/i

export default handler