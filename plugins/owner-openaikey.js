import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let key = db.data.datas.openaikey
	if (command.toLowerCase().includes('del')) {
		if (!text) throw `Masukkan OpenAIKey !`
		if (!key.includes(text)) throw `[!] Apikey tidak ada dalam List.\nCek dengan *${usedPrefix}listopenaikey*`
		key = key.filter(v => !v.includes(text))
		db.data.datas.openaikey = key
		m.reply('Berhasil menghapus OpenAIKey')
	} else if (command.toLowerCase().includes('list')) {
		let txt = `*List OpenAI Key :*\n`
		for (let i of key) { txt += `\n${i}\n───────────────────` }
		m.reply(txt)
	} else {
		if (!text) throw `Masukkan OpenAIKey !`
		if (key.includes(text)) throw `[!] Apikey sudah ada dalam list.`
		key.push(text)
		m.reply('Berhasil menambahkan OpenAIKey')
	}
}

handler.menuowner = ['add','del','list'].map(v => v + 'openaikey')
handler.tagsowner = ['ownerr']
handler.command = /^((add|del(ete)?|list)openaikey)$/i

handler.rowner = true

export default handler