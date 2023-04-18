import fetch from 'node-fetch'
import { format } from 'util'

let handler = async (m, { conn, text }) => {
	if (!/^https?:\/\//.test(text)) throw 'url invalid, please input a valid url. Try with add http:// or https://'
	let { href: url, origin } = new URL(text)
	let res = await fetch(url, { headers: { 'referer': origin }})
	if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) throw `Content-Length: ${res.headers.get('content-length')}`
	if (!/text|json/.test(res.headers.get('content-type'))) return conn.sendFile(m.chat, url, 'file', text, m)
	let txt = await res.buffer()
	try {
		txt = format(JSON.parse(txt + ''))
	} catch {
		txt = txt + ''
	}
	m.reply(txt.trim().slice(0, 65536) + '')
}

handler.help = ['fetch <url>']
handler.tags = ['information']
handler.command = /^(fetch|get)$/i

export default handler