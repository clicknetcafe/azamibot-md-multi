import fs from 'fs'
import path from 'path'
import SpottyDL from 'spottydl'
import { youtubedl } from '@bochilteam/scraper-sosmed'
import { isUrl } from '../../lib/func.js'

let handler = async (m, { conn, text, usedPrefix, command, __dirname }) => {
	if (!text) throw `Example: ${usedPrefix + command} Melukis Senja`
	if (isUrl(text)) {
		if (/\/track\//.test(text)) {
			try {
				let res = await SpottyDL.getTrack(text)
				if (typeof res !== 'object') throw 'invalid spotify track url'
				let tmp = path.join(__dirname, '../tmp')
				let ttl = tmp+`/${res.title}.mp3`
				fs.closeSync(fs.openSync(ttl, 'w'))
				let anu = await SpottyDL.downloadTrack(res, tmp)
				await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: ttl }, mimetype: 'audio/mpeg', fileName: `${res.title}.mp3` }, m, res.title, 'https://telegra.ph/file/2e15408ac5e72fc90bc3f.jpg', text)
			} catch (e) {
				console.log(e)
				let res = await SpottyDL.getTrack(text)
				let anu = await youtubedl('https://youtu.be/'+res.id)
				let data = anu.audio[Object.keys(anu.audio)[0]]
				let url = await data.download()
				await conn.sendFAudio(m.chat, { [/mp3/g.test(command) ? 'document' : 'audio']: { url: url }, mimetype: 'audio/mpeg', fileName: `${anu.title}.mp3` }, m, anu.title, anu.thumbnail, text)
			}
		} else if (/\/album\//.test(text)) {
			let anu = await SpottyDL.getAlbum(text)
			anu = anu.tracks
			if (typeof anu !== 'object' || anu.length == 0) throw 'invalid spotify album url'
			let txt = `*Found ${anu.length} Result*`
			for (let x of anu) {
				txt += `\n\n*name :* ${x.name}\n`
				+ `*track number :* ${x.trackNumber}\n`
				+ `https://www.youtube.com/watch?v=${x.id}\n`
				+ `───────────────────`
			}
			m.reply(txt)
		}
	} else {
		let bearer = (await (await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			body: new URLSearchParams({
				grant_type: 'client_credentials',
				client_id: '6efa7eefe8b84b68962d9b4f93c05d5d',
				client_secret: '368c159b66d34f01a076b73d361471f4'
			})
		})).json()).access_token
		let anu = await (await fetch(`https://api.spotify.com/v1/search?q=${text}&type=track&limit=15&include_external=audio&access_token=${bearer}`)).json()
		anu = anu.tracks.items
		if (anu.length == 0) throw 'judul tidak ditemukan.'
		let txt = `Found : *${text}*`
		for (let x of anu) {
			txt += `\n\n*Title :* ${x.name}\n`
			+ `*Artists :* ${x.album.artists[0].name}\n`
			+ `*Release :* ${x.album.release_date}\n`
			+ `*Link Spotify:*\n${x.external_urls.spotify}\n`
			+ `${x.preview_url ? `*Link Preview :*\n${x.preview_url}\n` : ''}`
			+ `───────────────────`
		}
		await conn.sendFile(m.chat, anu[0].album.images[0].url, '', txt, m)
	}
}

handler.menudownload = ['spotify <teks>','spotifydl <url>']
handler.tagsdownload = ['search']
handler.command = /^(spot(ify)?(mp3|audio)?(dl|search)?)$/i

handler.premium = true
handler.limit = true

export default handler