import uploadImage from '../lib/uploadImage.js'
import uploadFile from '../lib/uploadFile.js'
import fetch from 'node-fetch'
import { isValidUrl } from '../lib/others.js'

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || q.mtype || ''
	let img, out
	if (isValidUrl(text || '')) {
		out = text
	} else if (mime && mime != 'conversation') {
		img = await q.download?.()
		out = await uploadImage(img)
		if (!out) out = await uploadFile(img)
		if (!out) return m.reply('Failed upload media.')
	} else return m.reply(`Kirim Media atau URL dengan caption *${usedPrefix + command}*`)
	let url = {
		'tinyurl': 'shortlink',
		'shrtco': 'shortlink2',
		'cuttly': 'shortlink3',
		'tinycc': 'shortlink4'
	}
	let anu = await (await fetch(`https://api.lolhuman.xyz/api/${url[/short/.test(command) ? Object.keys(url).getRandom() : command]}?apikey=${apilol}&url=${out}`)).json()
	if (anu.status != 200) return m.reply('Internal server error.')
	m.reply(`*Original Url :*\n_${out}_\n\n*Shortlink :*\n_${anu.result}_`)
}

handler.help = ['shortlink','tinyurl','shrtco','cuttly','tinycc']
handler.tags = ['tools']
handler.command = /^(short(link)?|tinyurl|tinycc|cuttly|shrtco)$/i

handler.limit = true

export default handler