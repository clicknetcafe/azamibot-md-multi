import db from '../../lib/database.js'
import fs from 'fs'

let handler = async (m, { conn, args }) => {
	let who = m.quoted ? m.quoted.sender : m.mentionedJid[0] ? m.mentionedJid[0] : m.isGroup ? m.sender : m.chat
	let user = db.data.users[m.sender]
	let target = db.data.users[who]
	if (args[0] == 'create') {
		if (user.atm > 0) {
			m.reply(`[!] Anda sudah membuat rekening.`)
		} else if (user.money < 50000) {
			m.reply(`[!] Minimal memiliki 💵 50000 untuk deposit.`)
		} else {
			user.money -= 50000
			user.atm += 50000
			m.reply(`Berhasil membuat rekening.`)
		}
	} else {
		if (!target) return m.reply('[!] User tidak ada dalam database.')
		if (user.level < target.level) return m.reply('[!] Tidak dapat melihat karena level target lebih tinggi.')
		let name = await conn.getName(who)
		let thumb = fs.readFileSync('./media/bank.jpg')
		let anu = `🏦 Aset *${name.replaceAll('\n','')}*\n\n`
		anu += `*💰 Bank :* ${target.atm}\n`
		anu += `*💵 Money :* ${target.money}\n\n`
		anu += `*👑 Gold :* ${target.gold}\n`
		anu += `*💎 Diamond :* ${target.diamond}\n`
		anu += `*💚 Emerald :* ${target.emerald}`
		await conn.sendMsg(m.chat, { image: thumb, caption: anu }, { quoted: m })
	}
}

handler.menufun = ['bank <opts>']
handler.tagsfun = ['rpg']
handler.command = /^(bank|atm)$/i

export default handler