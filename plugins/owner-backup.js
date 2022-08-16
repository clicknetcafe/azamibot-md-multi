import fs from 'fs'
import path from 'path'
import { zip, COMPRESSION_LEVEL } from 'zip-a-folder';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (m.isGroup) return m.reply(`[ private chat only ]`)
	try {
		await zip('./sessions', './media/backup.zip', {compression: COMPRESSION_LEVEL.high})
		let date_ob = new Date();
		let date = ("0" + date_ob.getDate()).slice(-2);
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		let year = date_ob.getFullYear();
		let hours = date_ob.getHours();
		let minutes = date_ob.getMinutes();
		let seconds = date_ob.getSeconds();
		let ini_txt = `${year + month + date + "_" + hours + minutes + seconds}`

		let database = await fs.readFileSync(`./database.json`)
		let session = await fs.readFileSync(`./data.store.json`)
		let sessions = await fs.readFileSync(`./media/backup.zip`)
		await conn.sendMessage(m.chat, {document: database, mimetype: 'application/json', fileName: `database_azami_${ini_txt}.json`}, { quoted : m })
		await conn.sendMessage(m.chat, {document: session, mimetype: 'application/json', fileName: `data.store_azami_${ini_txt}.json`}, { quoted : m })
		await conn.sendMessage(m.chat, {document: sessions, mimetype: 'application/zip', fileName: `sessions_azami_${ini_txt}.zip`}, { quoted : m })
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan, coba lagi.`)
	}
}

handler.menudownload = ['database']
handler.tagsdownload = ['search']
handler.command = /^(data(base)?|backup)$/i

handler.owner = true

export default handler