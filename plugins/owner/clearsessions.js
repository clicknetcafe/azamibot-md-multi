import { readdirSync, statSync, unlinkSync } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, args }) => {
	const sesi = ['./sessions']
	const deletedFiles = [], array = []
	sesi.forEach(dirname => {
		readdirSync(dirname).forEach(file => {
			if (file !== 'creds.json') array.push(join(dirname, file))
		})
	})
	array.forEach(file => {
		const stats = statSync(file)
		if (stats.isDirectory()) {
			console.log(`Skipping directory: ${file}`)
		} else {
			unlinkSync(file)
			deletedFiles.push(file)
		}
	})
	m.reply('sessions cleared!')
}

handler.menuowner = ['clearsessions']
handler.tagsowner = ['owner']
handler.command = /^(clearsess?i(ons?)?)$/i

handler.owner = true

export default handler