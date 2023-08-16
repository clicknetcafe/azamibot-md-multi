import { format } from 'util'
import { isUrl } from '../../lib/func.js'

let handler = async (m, { conn, text }) => {
	if (!isUrl(text)) throw 'url invalid, please input a valid url. Try with add http:// or https://'
	try {
		let { href: url, origin } = new URL(text)
		console.log(url)
		let res = await fetch(url, { headers: { 'referer': origin }})
		if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) throw `Content-Length: ${res.headers.get('content-length')}`
		if (!/text|json/.test(res.headers.get('content-type'))) return conn.sendFile(m.chat, url, 'file', text, m)
		let txt = Buffer.from(await res.arrayBuffer())
		try {
			txt = format(JSON.parse(txt + ''))
		} catch {
			txt = txt + ''
		}
		m.reply(txt.trim().slice(0, 65536) + '')
	} catch (e) {
		console.log(e)
		throw '{}'
	}
}

handler.help = ['fetch <url>']
handler.tags = ['information']
handler.command = /^(fetch|get)$/i

export default handler