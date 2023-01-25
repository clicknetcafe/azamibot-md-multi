import { sfilemobi, sfilemobiSearch } from '@bochilteam/scraper'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
	if (!text) throw `For searching in sfilemobi :\nUsage : *${usedPrefix + command} query*\n\nFor download from url :\nUsage : *${usedPrefix + command} sfilemobi_url*`
	if (text.includes('http://') || text.includes('https://')) {
		if (!text.includes('sfile.mobi')) return m.reply('Bukan web sfile.mobi itu bre')
		try {
			let res = await sfilemobi(`${text}`)
			if (res.filesize > 200000) return m.reply(`Filesize: ${res.filesizeH}\nTidak dapat mengirim, maksimal file 200 MB`)
			let ini_txt = `_*Downloading file, don't spam . . .*_\n\n[ FILE INFO ]\n`
			ini_txt += `filename : ${res.filename}\n`
			ini_txt += `type : ${res.type}\n`
			ini_txt += `upload : ${res.aploud}\n`
			ini_txt += `upload by : ${res.aploudby}\n`
			ini_txt += `download : ${res.downloads}\n`
			ini_txt += `filesize : ${res.filesizeH}`
			m.reply(ini_txt)
			//await conn.sendMessage(m.chat, {document: { url: res.url }, mimetype: `${res.filename.split('.').pop()}`, fileName: `${res.filename}`}, { quoted : m })
			await conn.sendFile(m.chat, res.url, `${res.filename}`, null, m)
		} catch (e) {
			console.log(e)
			m.reply(`Tidak ditemukan hasil.`)
		}
	} else {
		try {
			let json = await sfilemobiSearch(`${text}`)
			let ini_txt = `Found : *${text}*`
			for (let x of json) {
				ini_txt += `\n\nFilename : ${x.filename}\n`
				ini_txt += `Type : ${x.type}\n`
				ini_txt += `Size : ${x.filesizeH}\n`
				ini_txt += `Link : ${x.url}\n`
				ini_txt += `───────────────────`
			}
			m.reply(ini_txt)
		} catch (e) {
			console.log(e)
			m.reply(`Tidak ditemukan hasil.`)
		}
	}
}

handler.menudownload = ['sfilemobi <query>','sfilemobi <url>']
handler.tagsdownload = ['search']
handler.command = /^(sfile(mobi)?)$/i

handler.premium = true
handler.limit = true

export default handler