import uploadImage from '../../lib/uploadImage.js'
import { isUrl, someincludes } from '../../lib/func.js'
import db from '../../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	let img, out, custom
	if (isUrl(args[0] || '')) {
		out = args[0]
		if (args[1]) custom = args[1]
	} else if (mime && mime != 'conversation') {
		out = await uploadImage(await q.download())
		if (args[0]) custom = args[0]
		if (!out) throw 'Failed upload media.'
	} else throw `Kirim Media atau URL dengan caption *${usedPrefix + command}*`
	if (/short/.test(command)) command = ['cuttly','tinyurl','tinycc'].getRandom()
	let anu = await shortlink(api, command.replace('link', ''), out, custom)
	m.reply(`*[ link shortener ]*\n\n${anu}`)
}

handler.help = ['shortlink','cuttly','owovc','shrtco','tinycc','tinyurl','ulvis']
handler.tags = ['tools']
handler.command = /^((short|cuttly|owovc|shrtco|tinycc|tinyurl|ulvis)(link)?)$/i

handler.limit = true

export default handler
        
async function shortlink(apikey, command, out, custom) {
	let anu, url
	try {
		if (/ulvis/.test(command)) {
			anu = await (await fetch(`https://ulvis.net/API/write/get?url=${out}&custom=${custom || ''}&type=json`)).json()
			if (!anu.success) return anu.error.msg
			anu = anu.data
			if (anu.status) return anu.status
			url = anu.url
		} else if (/shrtco/.test(command)) {
			anu = await (await fetch(`https://api.shrtco.de/v2/shorten?url=${out}`)).json()
			if (!anu.ok) return anu.error
			url = anu.result.full_short_link
		} else if (/owovc/.test(command)) {
			anu = await (await fetch('https://owo.vc/api/v2/link', {
				method: 'POST',
				headers: {
					'accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					link: out,
				    generator: 'owo',
					metadata: 'OWOIFY'
				}),
			})).json()
			if (anu.error) return anu.message
			url = anu.id
		} else if (/cuttly/.test(command)) {
			anu = await (await fetch(`https://cutt.ly/api/api.php?key=${apikey.cuttly}&short=${out}&name=${custom || ''}`)).json()
			anu = anu.url
			if (!anu.shortLink) return `error code ${anu.status == 3 ? ' 3 : alias already used' : anu.status}`
			url = anu.shortLink
		} else if (/tinyurl/.test(command)) {
			anu = await (await fetch('https://api.tinyurl.com/create', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${apikey.tinyurl}`,
					'accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					url: out,
					domain: 'tinyurl.com',
					alias: `${custom || ''}`
				})
			})).json()
			url = anu
			if (anu.errors.length > 0) return anu.errors[0]
			url = anu.data.tiny_url
		} else if (/tinycc/.test(command)) {
			anu = await (await fetch('https://tiny.cc/tiny/api/3/urls/', {
				method: 'POST',
				headers: {
					'Authorization': `Basic ${apikey.tinycc}`,
					'accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ urls: [{
					long_url: out,
					custom_hash: `${custom || ''}`
					}]
				})
			})).json()
			if (!anu.urls) return anu.error.message
			if (!anu.urls[0].short_url) return anu.urls[0].error.message
			url = anu.urls[0].short_url_with_protocol
		}
	} catch (e) {
		console.log(e)
	}
	return url ? url : 'Internal server error.'
}