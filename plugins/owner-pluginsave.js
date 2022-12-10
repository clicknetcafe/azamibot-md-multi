import fs from 'fs'

let handler = async (m, { usedPrefix, command, text }) => {
	if (!text) return m.reply(`Nama plugin nya apa ?\n\nContoh : *${usedPrefix + command} sc*`)
	const files = fs.readdirSync('./plugins')
	let listall = `${files}`
	try {
		let teks = m.quoted.text
		if (teks == undefined) return m.reply(`reply teks yang ingin dijadikan plugin!`)
		if(listall.includes(`,${text.replace('.js','')}.js`) || text.includes('anime-anime')) {
			await fs.writeFileSync(`./plugins/${text.replace('.js','')}.js`, m.quoted.text)
			m.reply(`Plugin updated : *${text.replace('.js','')}.js*`)
		} else {
			m.reply(`plugin tidak ditemukan.`)
		}
	} catch (e) {
		m.reply(`Tidak menemukan teks`)
	}
}

handler.menuowner = ['saveplugin']
handler.tagsowner = ['mods']
handler.command = /^((save|sf)(plugins?)?|pluginsave)$/i

handler.mods = true

export default handler