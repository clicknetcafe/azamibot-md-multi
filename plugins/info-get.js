import fetch from 'node-fetch'
import util, { format } from 'util'

let handler = async (m, { text }) => {
	if (!/^https?:\/\//.test(text)) throw 'url invalid, please input a valid url. Try with add http:// or https://'
	try {
		let _url = new URL(text)
		let url = global.API(_url.origin, _url.pathname, Object.fromEntries(_url.searchParams.entries()), 'APIKEY')
		let res = await fetch(url)
		if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
			throw `Content-Length: ${res.headers.get('content-length')}`
		}
		if (!/text|json/.test(res.headers.get('content-type'))) return conn.sendFile(m.chat, url, 'file', text, m)
		let txt = await res.buffer()
		txt = util.format(JSON.parse(txt+'')) || ''
		m.reply(txt.slice(0, 65536) + '')
	} catch (e) { throw format(e) }
}

handler.help = ['fetch <url>']
handler.tags = ['information']
handler.command = /^(fetch|get)$/i

export default handler