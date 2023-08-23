import { isUrl } from '../../lib/func.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Example : ${usedPrefix + command} https://google.com`
	if (!isUrl(args[0])) throw `url invalid, please input a valid url. Try with add http:// or https://`
	await conn.sendFile(m.chat, `https://screenia.best/api/screenshot?url=${args[0]}`, '', `_${command} ${args[0]}_`, m)
}

handler.help = ['ssweb <url>']
handler.tags = ['information']
handler.command = /^(ss(web)?)$/i

handler.premium = true
handler.limit = true

export default handler