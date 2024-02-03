import db from '../../lib/database.js'

let handler = async (m, { conn, command, usedPrefix, text}) => {
	let subject = await conn.getName(m.chat)
	if (!text) return await conn.reply(m.chat, `[ ! ] Masukkan teks.\n\n*Tips :*\n@user - menampilkan tag user.${command.includes('bye') ? '' : '\n@subject - menampilkan nama grup.\n@desc - menampilkan deskripsi grup'}\n\n${command.includes('bye') ? `*Contoh :*\n${usedPrefix + command} Sayonara @user!\n\n*Hasil teks :*\nSayonara @${m.sender.split('@')[0]} !` : `*Contoh :*\n${usedPrefix + command} Hallo @user, Selamat Datang di @subject\n\n*Hasil teks :*\nHallo @${m.sender.split('@')[0]}, Selamat Datang di ${subject}`}`, m, { mentions: [m.sender] })
	let chat = db.data.chats[m.chat]
	if (text.toLowerCase() == 'default' || text.toLowerCase() == 'reset') text = ''
	if (command.includes('bye')) chat.sBye = text
	else chat.sWelcome = text
	await m.reply(`Berhasil mengubah *${command.includes('bye') ? 'Bye' : 'Welcome'}* menjadi :\n\n${text}`)
}

handler.menugroup = ['setwelcome', 'setbye']
handler.tagsgroup = ['group']
handler.command = /^(set(welcome|bye))$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler