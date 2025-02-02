import axios from 'axios'
import * as cheerio from 'cheerio'
import uploadImage from '../../lib/uploadImage.js'

let handler = async (m, { conn, command, usedPrefix }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/webp/.test(mime) || /ptv/.test(q.mtype) || q.isAnimated) {
		try {
			let buf = await q.download()
			let out = /ptv/.test(q.mtype) ? buf : ('https:'+await converter(await uploadImage(buf)))
			//await conn.sendMsg(m.chat, { video: { url: 'https:'+out }, caption: '*DONE*', gifPlayback: /gif/i.test(command), gifAttribution: ~~(Math.random() * 2) }, { quoted: m });
			await conn.sendFile(m.chat, out, '', '*DONE*', m, false, { gifPlayback: /gif/i.test(command), gifAttribution: ~~(Math.random() * 2) })
		} catch (e) {
			console.log(e)
			m.reply('conversion failed')
		}
	} else throw `Reply sticker / ptv with command *${usedPrefix + command}*`
}

handler.help = ['ptvtovideo','togif','tomp4']
handler.tags = ['tools']
handler.command = /^((ptv)?to(gif|mp4|vid(eo)?))$/i

export default handler

async function converter(url) {
	const res = await axios('https://ezgif.com/webp-to-mp4?url=' + url)
	const $ = cheerio.load(res.data)
	const file = $('input[name="file"]').attr('value')
	const data = {
		file: file,
		convert: 'Convert WebP to MP4!',
	}
	const res2 = await axios({
		method: 'post',
		url: 'https://ezgif.com/webp-to-mp4/' + data.file,
		data: new URLSearchParams(Object.entries(data)) 
	})  
	const $2 = cheerio.load(res2.data)  
	const link = $2('div#output > p.outfile > video > source').attr('src')
	return link
}