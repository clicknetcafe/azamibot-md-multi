import { format } from 'util'
import { spawn } from 'child_process'
import { delay } from '../../lib/func.js'

const fontPath = 'src/font/Zahraaa.ttf'

function divideArray(arr) {
	let array = []
	const chunkSize = 28;
	for (let i = 0; i < arr.length; i += chunkSize) {
		const chunk = arr.slice(i, i + chunkSize);
		array.push(chunk)
	}
	return array
}

let handler = async (m, { conn, command, text }) => {
	text = (text ? text : m.quoted?.text ? m.quoted.text : '').trim().match(/.{0,65}/g)
	if (text[0] == '') throw `Mau nulis apa ?`
	text = await divideArray(text).reverse()
	if (!global.support.convert && !global.support.magick && !global.support.gm) return handler.disabled = true
	let inputPath = 'src/kertas/magernulis1.jpg'
	let d = new Date()
	let tgl = d.toLocaleDateString('id-Id')
	let hari = d.toLocaleDateString('id-Id', { weekday: 'long' })
	for (let x=0;x<text.length;x++) {
		let bufs = []
		const [_spawnprocess, ..._spawnargs] = [...(global.support.gm ? ['gm'] : global.support.magick ? ['magick'] : []),
			'convert',
			inputPath,
			'-font',
			fontPath,
			'-size',
			'1024x784',
			'-pointsize',
			'20',
			'-interline-spacing',
			'1',
			'-annotate',
			'+806+78',
			hari,
			'-font',
			fontPath,
			'-size',
			'1024x784',
			'-pointsize',
			'18',
			'-interline-spacing',
			'1',
			'-annotate',
			'+806+102',
			tgl,
			'-font',
			fontPath,
			'-size',
			'1024x784',
			'-pointsize',
			'20',
			'-interline-spacing',
			'-7.5',
			'-annotate',
			'+344+142',
			text[x].join('\n'),
			'jpg:-'
		]
		spawn(_spawnprocess, _spawnargs)
			.on('error', e => m.reply(format(e)))
			.on('close', async () => {
				await delay(500)
				await conn.sendMsg(m.chat, { image: Buffer.concat(bufs), caption: `*[${x+1}]* Hati² ketahuan:v` }, { quoted: m })
			})
			.stdout.on('data', chunk => bufs.push(chunk))
	}
}

handler.help = ['nulis','nuliskanankiri'].map(v => v + ' <teks>')
handler.tags = ['tools']
handler.command = /^(nulis(kanan(kiri)?)?)$/i

export default handler