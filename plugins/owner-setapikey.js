import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command, args }) => {
	let api = db.data.datas.api
	if (/set|add/.test(command)) {
		if (!args[0]) return m.reply(`[!] Input Apikey.\n\n*${usedPrefix}cekapi* untuk melihat list api.\n*${usedPrefix}editapi* untuk mengedit api.\n*${usedPrefix}delapi* untuk menghapus api.`)
		api.push(args[0])
		db.data.datas.api = api
		m.reply(`APIKEY berhasil ditambahkan :\n*${args[0]}*\n\n*${usedPrefix}cekapi* untuk mengecek.`)
	} else if (/cek/.test(command)) {
		if (m.isGroup) m.reply('_open your private chat_')
		await conn.sendMsg(db.data.datas.rowner[0][0]+'@s.whatsapp.net', { text: `*YOUR APIKEY LIST :*\n\n${JSON.stringify(api, null, 4)}` }, { quoted: m })
	} else {
		if (m.isGroup) throw '[ PRIVATE CHAT ONLY ]'
		if(api.length == 0) throw '[!] Belum ada apikey yang di set.'
		let txt = ''
		let tx = 'Remove'
		for (let a=0;a<api.length;a++) {
			txt += `[${a}] -> ${api[a]}\n`
		}
		txt += `\nExample : *${usedPrefix + command} 0*`
		if (/edit/.test(command)) {
			tx = 'Edit'
			if (!api[args[0]] || !args[1]) return m.reply(txt+' apikeybaru')
			api[args[0]] = args[1]
			db.data.datas.api = api
		} else {
			if (!api[args[0]]) return m.reply(txt)
			api = api.filter(v => v !== api[args[0]])
			db.data.datas.api = api
		}
		m.reply(`*${tx} Success, new apikey list :*\n\n${JSON.stringify(api, null, 4)}`)
	}
}

handler.menuowner = ['set','cek','edit','delete'].map(v => v+'api')
handler.tagsowner = ['ownerr']
handler.command = /^((set|add|cek|edit|del(ete)?)(api(key)?))$/i

handler.rowner = true

export default handler