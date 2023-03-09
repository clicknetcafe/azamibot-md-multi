import fs from 'fs'
import path from 'path'

let handler = async (m, { usedPrefix, command, text, __dirname }) => {
	if (!text) return m.reply(`Nama file nya apa ?\n\nContoh : *${usedPrefix + command} sc*`)
	let filename = path.join(__dirname, `./${text}${!/\.js$/i.test(text) ? '.js' : ''}`)
	let listPlugins = fs.readdirSync(path.join(__dirname)).map(v => v.replace(/\.js/, ''))
	if (!fs.existsSync(filename)) return m.reply(`'${filename}' not found!\n${listPlugins.map(v => v).join('\n').trim()}`)
	m.reply(fs.readFileSync(filename, 'utf8'))
}

handler.menuowner = ['getplugin']
handler.tagsowner = ['mods']
handler.command = /^(gp|getplugin|pg|pluginget)$/i

handler.mods = true

export default handler