import db from '../../lib/database.js'

const cooldown = 86400000

let handler = async (m, { conn, command, args }) => {
	let who
	if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : args[0] ? args[0] : ''
	else who = m.quoted ? m.quoted.sender : m.chat ? m.chat : ''
	if (!who) return m.reply(`tag orangnya!`)
	let user = db.data.users
	let prems = db.data.datas.prems
	who = who.replace(/\D/g,'') + '@s.whatsapp.net'
	if (!user[who]) return m.reply(`[!] User tidak ada dalam database.`)
	if (!prems.map(v => v.user).includes(who)) return m.reply(`[ ! ] User tidak ada dalam list premium.`)
	if ((m.quoted && !args[0]) || (!m.quoted && !args[1] && m.isGroup)) return m.reply(`[!] Masukkan durasi *( dalam hari )*`)
	if ((m.quoted && isNaN(args[0])) || (!m.quoted && isNaN(args[1]) && m.isGroup)) return m.reply(`[!] Durasi harus dalam format angka.`)
	let idx = prems.findIndex((v => v.user == who))
	let durasi = parseInt(args[1] ? args[1] : args[0])
	if (command.includes('min') || command.includes('kurang')) {
		prems[idx].date -= durasi * cooldown
		user[who].expired -= durasi * cooldown
	} else {
		prems[idx].date += durasi * cooldown
		user[who].expired += durasi * cooldown
	}
	db.data.datas.prems = prems
	await conn.reply(m.chat, `${(command.includes('min') || command.includes('kurang')) ? 'Mengurangi' : 'Menambah'} durasi premium @${(who || '').replace(/@s\.whatsapp\.net/g, '')} sebanyak *${durasi} hari*`, m, { mentions: [who] })
}

handler.menuowner = ['addpremdurasi <@tag>']
handler.tagsowner = ['owner']
handler.command = /^(((t|n)ambah|add|plus|min|kurang)(prem(ium)?dura(si|tion)|dura(si|tion)prem(ium)?))$/i

handler.rowner = true

export default handler