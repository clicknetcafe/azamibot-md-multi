import { isUrl } from '../../lib/func.js'

let handler = async (m, { conn, text, isOwner }) => {
	if (!isUrl(text)) throw 'url invalid, please input a valid url. Try with add http:// or https://'
	let { href: url, origin } = new URL(text)
	try {
		let res = await fetch(url, { headers: { 'referer': origin }})
		if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) throw `Content-Length: ${res.headers.get('content-length')}`
		if (!/text|json/.test(res.headers.get('content-type'))) return await conn.sendFile(m.chat, url, '', pauthor, m)
		let txt = Buffer.from(await res.arrayBuffer())
		try {
			txt = JSON.stringify(JSON.parse(txt + ''), null, 2)
		} catch {
			txt = txt + ''
		}
		// only owner can see the ip address (both ip v4 and v6)
		if (!isOwner) txt = txt.replace(/\b(?:\d{1,3}\.){3}\d{1,3}\b|[A-Fa-f0-9]{1,4}(?::[A-Fa-f0-9]{1,4}){7}/g, "#hidden")
		m.reply(txt.trim().slice(0, 65536) + '')
	} catch (e) {
		console.log(e)
		m.reply('fetch failed.')
	}
}

handler.help = ['fetch <url>']
handler.tags = ['information']
handler.command = /^(fetch|get)$/i

export default handler