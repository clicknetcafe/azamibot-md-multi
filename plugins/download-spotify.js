import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `*Usage : ${usedPrefix + command} url*\n\nExample: ${usedPrefix + command} https://open.spotify.com/track/0ZEYRVISCaqz5yamWZWzaA\n\n*Tips :* Untuk mencari link spotify, bisa juga dengan command *${usedPrefix}spotsearch*`
	if (!(text.includes('http://') || text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	try {
		let anu = await (await fetch(`https://api.lolhuman.xyz/api/spotify?apikey=${apilol}&url=${text}`)).json()
		if (anu.status != 200) throw Error(anu.message)
		anu = anu.result
		let txt = `Found : ${text}\n\n`
		txt += `Title : *${anu.title}*\n`
		txt += `Artists : ${anu.artists}\n`
		txt += `Duration : ${anu.duration}\n`
		txt += `Popularity : ${anu.popularity}\n`
		txt += `${anu.preview_url ? `Preview : ${anu.preview_url}\n` : ''}`
		await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted : m })
		await conn.sendMsg(m.chat, { [/mp3/.test(command) ? 'document' : 'audio']: { url: anu.link }, mimetype: 'audio/mpeg', fileName: `${anu.artists} - ${anu.title}.mp3`}, { quoted : m })
	} catch (e) {
		console.log(e)
		throw 'invalid url / server down.'
	}
}

handler.menudownload = ['spotify <url>']
handler.tagsdownload = ['search']
handler.command = /^(spotify(a(audio)?|mp3)?)$/i

handler.premium = true
handler.limit = true

export default handler