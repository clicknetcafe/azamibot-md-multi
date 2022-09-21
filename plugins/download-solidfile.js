import fetch from 'node-fetch'

let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `*Usage : ${usedPrefix + command} url*\n\nExample :\n${usedPrefix + command} http://www.solidfiles.com/v/zdpVXjvRk8yaV`
	if (!(text.includes('http://') || text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	try {
		let res = await fetch(`https://api.akuari.my.id/downloader/sfiledl?link=${text}`)
		let anu = await res.json()
		if (anu.size.slice(-2) == "GB") return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.size}`)
		if (anu.size.slice(-2) != "KB" && parseInt(anu.size.replace(" MB", "")) > 200) return m.reply(`Filesize: ${anu.size}\nTidak dapat mengirim, maksimal file 200 MB`)
		//await conn.sendMessage(m.chat, {document: { url: anu.url }, mimetype: `${anu.title.split('.').pop()}`, fileName: `${anu.title}`}, { quoted : m })
		await conn.sendFile(m.chat, anu.url, `${anu.title}`, null, m)
	} catch (e) {
		console.log(e)
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/solidfiles?apikey=${global.api}&url=${text}`)
			let anu = await res.json()
			if (anu.result.size.slice(-2) == "GB") return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.result.size}`)
			if (anu.result.size.slice(-2) != "KB" && parseInt(anu.result.size.replace(" MB", "")) > 200) return m.reply(`Filesize: ${anu.result.size}\nTidak dapat mengirim, maksimal file 200 MB`)
			//await conn.sendMessage(m.chat, {document: { url: anu.result.link }, mimetype: `${anu.result.title.split('.').pop()}`, fileName: `${anu.result.title}`}, { quoted : m })
			await conn.sendFile(m.chat, anu.result.link, `${anu.result.title}`, null, m)
		} catch (e) {
			console.log(e)
			throw `Invalid Solidfiles URL / terjadi kesalahan.`
		}
	}
}

handler.menudownload = ['solidfile <url>']
handler.tagsdownload = ['search']
handler.command = /^(solidfiles?)$/i

handler.premium = true
handler.limit = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))