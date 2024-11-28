import axios from 'axios'
import { isUrl } from '../../lib/func.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Example : ${usedPrefix + command} https://google.com`
	if (!isUrl(args[0])) throw `url invalid, please input a valid url. Try with add http:// or https://`
	//await conn.sendFile(m.chat, `https://www.screenia.best/api/screenshot?url=${args[0]}${command.includes('full') ? '&fullscreen=true' : ''}&type=png`, '', `_${command} by ${pauthor}_`.trim(), m)
	let fimg = await fetch(`https://mini.s-shot.ru/${/hp/.test(command) ? '1170x2532' : '1600x900'}/PNG/2560/Z100/?`+args[0])
	await conn.sendFile(m.chat, fimg.status == 200 ? Buffer.from(await fimg.arrayBuffer()) : `https://aemt.uk.to/ss${/hp/.test(command) ? 'hp' : 'pc'}?url=${args[0]}`, '', `_${/hp/.test(command) ? 'Portrait' : 'Desktop'} Screenshot_`.trim(), m)
}

handler.help = ['ssweb <url>','sshp <url>']
handler.tags = ['information']
handler.command = /^(ss(web|hp)?)$/i

handler.premium = true
handler.limit = true

export default handler