import fs from 'fs'
import { format } from 'util'

let handler = async (m, { usedPrefix, command, text }) => {
	try {
		if (!text) return m.reply(`mau di save kemana ?\n\n*Contoh :*\n${usedPrefix + command} plugins/bunny.js`)
		if (!m.quoted?.text) throw `balas pesan nya!`
		let dir = text.includes('.js') ? text : `plugins/${text}.js`
		await fs.writeFileSync(dir, m.quoted.text)
		m.reply(`tersimpan di '${dir}'`)
	} catch (e) {
		console.log(e)
		throw `Error: ENOENT: no such file or directory, open '${text}'`
	}
}

handler.menuowner = ['saveplugin']
handler.tagsowner = ['mods']
handler.command = /^((save|sf)(plugins?)?|pluginsave)$/i

handler.mods = true

export default handler