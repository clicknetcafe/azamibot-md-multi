import * as os from 'os'
import fs from 'fs'
import path from 'path'

let handler = async (m, { usedPrefix, command, text, __dirname }) => {
	if (!text) return m.reply(`mau di save kemana ?\n\n*Contoh :*\n${usedPrefix + command} group/afk.js`)
	if (!m.quoted?.text) throw `balas pesan nya!`
	let dir = path.join(__dirname, /\.[a-zA-Z0-9]+$/.test(text) ? `./../${text}` : `./${text}.js`)
	try {
		let anu = fs.existsSync(dir)
		await fs.writeFileSync(dir, m.quoted.text)
		if (anu) m.reply(`saved in '${dir.replace(__dirname, `${os.platform() == 'win32' ? '\\' : '/'}plugins`)}'`)
		else m.reply(`*[new file created]*\n\nsaved in '${dir}'`)
	} catch (e) {
		console.log(e)
		throw `Error: ENOENT: no such file or directory, open '${dir}'`
	}
}

handler.menuowner = ['saveplugin']
handler.tagsowner = ['mods']
handler.command = /^((save|sf)(plugins?)?|pluginsave)$/i

handler.mods = true

export default handler