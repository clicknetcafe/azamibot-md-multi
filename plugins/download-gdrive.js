import fetch from 'node-fetch'
import { sizeFormatter } from 'human-readable'
import { someincludes } from '../lib/others.js'

const formatSize = sizeFormatter({
	std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
})

let handler = async (m, { conn, args }) => {
	if (!args[0]) throw '[!] Input GoogleDrive URL'
	GDriveDl(args[0]).then(async (res) => {
		if (res.error || res.status) return m.reply(`Invalid GoogleDrive URL Promise`)
		if (res.fileSize.slice(-2) == "GB") return m.reply(`Ngotak dong.\nMana bisa ngirim video ${res.fileSize}`)
		if (!someincludes(['kB','KB'], res.fileSize.slice(-2)) && parseInt(res.fileSize) > 300) return m.reply(`Filesize: ${res.fileSize}\nTidak dapat mengirim, maksimal file 300 MB`)
		let txt = `_*Downloading file, don't spam . . .*_\n\n`
		txt += `*filename :* ${res.fileName}\n`
		txt += `*filesize :* ${res.fileSize}\n`
		txt += `*mimetype :* ${res.mimetype}`
		m.reply(txt)
		await conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m })
	})
}

handler.menudownload = ['gdrive <url>']
handler.tagsdownload = ['search']
handler.command = /^(g(oogle)?drive)$/i

handler.premium = true
handler.limit = true

export default handler

async function GDriveDl(url) {
	let id, res = { "error": true }
	if (!(url && url.match(/drive\.google/i))) return res
	try {
		id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
		if (!id) throw 'ID Not Found'
		res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
			method: 'post',
			headers: {
				'accept-encoding': 'gzip, deflate, br',
				'content-length': 0,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'origin': 'https://drive.google.com',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
				'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
				'x-drive-first-party': 'DriveWebUi',
				'x-json-requested': 'true' 
			}
		})
		let { fileName, sizeBytes, downloadUrl } =  JSON.parse((await res.text()).slice(4))
		if (!downloadUrl) throw 'Link Download Limit!'
		let data = await fetch(downloadUrl)
		if (data.status !== 200) return data.statusText
		return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') }
	} catch (e) {
		console.log(e)
		return res
	}
}