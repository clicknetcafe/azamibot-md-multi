import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let key = db.data.datas.apiflashkey
	if (command.toLowerCase().includes('del')) {
		if (!text) throw `Masukkan apiflashkey !`
		if (!key.includes(text)) throw `[!] Apikey tidak ada dalam List.\nCek dengan *${usedPrefix}listapiflashkey*`
		key = key.filter(v => !v.includes(text))
		db.data.datas.apiflashkey = key
		m.reply('Berhasil menghapus apiflashkey')
	} else if (command.toLowerCase().includes('add')) {
		if (!text) throw `Masukkan apiflashkey !`
		if (key.includes(text)) throw `[!] Apikey sudah ada dalam list.`
		key.push(text)
		m.reply('Berhasil menambahkan apiflashkey')
	} else {
		let txt = `*List ApiFlash Key :*\n`
		for (let i of key) { txt += `\n${i}\n───────────────────` }
		m.reply(txt)
	}
}

handler.menuowner = ['add','del','list'].map(v => v + 'apiflashkey')
handler.tagsowner = ['ownerr']
handler.command = /^((add|del(ete)?|(list)?)apiflashkey)$/i

handler.rowner = true

export default handler