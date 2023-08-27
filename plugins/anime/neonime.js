import { isUrl } from '../../lib/func.js'
import { neonimeEpisode, neonimeSearch, neonimeTvshow } from '../../lib/scrape.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	try {
		if (isUrl(text)) {
			if (text.includes('/batch/')) {
				m.reply('maintenance for batch link')
			} else if (text.includes('/tvshows/')) {
				let anu = await neonimeTvshow(text)
				let txt = ''
				for (let x of Object.keys(anu).filter(v => !/epis|thumb/.test(v))) {
					txt += `*${x} :* ${anu[x]}\n`
				}
				txt += `\n*[ LIST EPISODES ]*\n`
				for (let x of anu.episodes) {
					for (let y of (Object.keys(x))) {
						txt += `\n*${y} :* ${x[y]}`
					}
					txt += `\n───────────────────\n`
				}
				await conn.sendFile(m.chat, anu.thumbnail, '', txt, m)
			} else {
				let anu = await neonimeEpisode(text)
				let url = anu.thumbnail
				let txt = ''
				for (let x of Object.keys(anu).filter(v => !/down|thumb/.test(v))) {
					txt += `*${x} :* ${anu[x]}\n`
				}
				txt += `\n*[ LIST DOWNLOAD ]*\n`
				anu = anu.download
				for (let x of Object.keys(anu)) {
					for (let y of (Object.keys(anu[x]))) {
						txt += `\n*${y} :* ${anu[x][y]}`
					}
					txt += `\n───────────────────\n`
				}
				await conn.sendFile(m.chat, url, '', txt, m)
			}
		} else {
			let anu = await neonimeSearch(text)
			if (!anu.status) throw Error()
			anu = anu.result
			let txt = `*Found ${anu.length} Result :*\n`
			for (let x of anu) {
				for (let y of Object.keys(x).filter(v => !/thumb/.test(v))) {
					txt += `\n*${y} :* ${x[y]}`
				}
				txt += `\n───────────────────`
			}
			await conn.sendFile(m.chat, anu[0].thumbnail, '', txt, m)
		}
	} catch (e) {
		console.log(e)
		throw 'not found.'
	}
}

handler.menuanime = ['neonime']
handler.tagsanime = ['search']
handler.command = /^(neonime(web|search)?)$/i

handler.premium = true
handler.limit = true

export default handler