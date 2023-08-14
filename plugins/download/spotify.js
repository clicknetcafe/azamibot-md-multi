import { isValidUrl } from '../../lib/others.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Melukis Senja`
	if (isValidUrl(text)) {
		try {
			let anu = await (await fetch(`https://api.botcahx.live/api/download/spotify?url=${text}&apikey=${apilol}`)).json()
			anu = anu.result.data
			let txt = `*${anu.title}*\n\n`
			txt += `*id :* ${anu.artist.id}\n`
			txt += `*name :* ${anu.artist.name}\n`
			txt += `*duration :* ${anu.duration}\n`
			txt += `*artist :* _${anu.artist.external_urls.spotify}_`
			await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted : m })
			await conn.sendMsg(m.chat, { [/mp3/.test(command) ? 'document' : 'audio']: { url: anu.url }, mimetype: 'audio/mpeg', fileName: `${anu.title}.mp3`}, { quoted : m })
		} catch (e) {
			console.log(e)
			throw 'invalid url / server down.'
		}
	} else {
		let anu = await (await fetch(`https://api.lolhuman.xyz/api/spotifysearch?apikey=${apilol}&query=${text}`)).json()
		if (!anu.status) throw Error(anu.message)
		let txt = `Found : *${text}*`
		for (var x of anu.result) {
			txt += `\n\n*Title : ${x.title}*\n`
			txt += `Artists : ${x.artists}\n`
			txt += `Duration : ${x.duration}\n`
			txt += `Link : ${x.link}\n`
			txt += `${x.preview_url ? `Preview : ${x.preview_url}\n` : ''}`
			txt += `───────────────────`
		}
		m.reply(txt)
	}
}

handler.menudownload = ['spotify <teks>','spotifydl <url>']
handler.tagsdownload = ['search']
handler.command = /^(spot(ify)?(mp3|audio)?(dl|search)?)$/i

handler.premium = true
handler.limit = true

export default handler