import { someincludes } from '../../lib/func.js'
import { GDriveDl } from '../../lib/scrape.js'

let handler = async (m, { conn, args }) => {
	if (!(args[0] || '').match(/([\w-]){33}|([\w-]){19}/)) throw '[!] Input GoogleDrive URL'
	try {
		let anu = await GDriveDl(args[0])
		if (anu.fileSize.slice(-2) == "GB") return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.fileSize}`)
		if (!someincludes(['kB','KB'], anu.fileSize.slice(-2)) && parseInt(anu.fileSize) > 300) return m.reply(`Filesize: ${anu.fileSize}\nTidak dapat mengirim, maksimal file 300 MB`)
		let txt = `_*Downloading file, don't spam . . .*_\n\n`
		txt += `*filename :* ${anu.fileName}\n`
		txt += `*filesize :* ${anu.fileSize}\n`
		txt += `*mimetype :* ${anu.mimetype}`
		await m.reply(txt)
		await conn.sendMsg(m.chat, { document: { url: anu.downloadUrl }, fileName: anu.fileName, mimetype: anu.mimetype }, { quoted: m })
	} catch (e) {
		console.log(e)
		throw 'Bot tidak memiliki akses ke GoogleDrive ini'
	}
}

handler.menudownload = ['gdrive <url>']
handler.tagsdownload = ['search']
handler.command = /^(g?(oogle)?drive)$/i

handler.premium = true
handler.limit = true

export default handler