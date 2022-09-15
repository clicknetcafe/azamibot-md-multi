import db from '../lib/database.js'

//const cooldown = 1000 // 1 detik
//const cooldown = 60000 // 1 menit
//const cooldown = 3600000 // 1 jam
//const cooldown = 86400000 // 1 hari
//const cooldown = 2592000000 // 1 bulan

const cooldown = 7200000

function ranNumb(min = null, max = null) {
	if (max !== null) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} else {
		return Math.floor(Math.random() * min) + 1
	}
}

let handler = async (m, { conn, text }) => {
	let who = m.mentionedJid[0]
	if (!who) return m.reply('Tag salah satu yang kamu ingin ajak berdagang')
	if (typeof db.data.users[who] == 'undefined') return m.reply('Pengguna tidak ada didalam data base')
	let user = db.data.users[m.sender]
	let user2 = db.data.users[who]
	if (new Date - user.lastdagang <= cooldown) return m.reply(`Kamu Sudah Berdagang , tunggu 🕖 *${((user.lastdagang + cooldown) - new Date()).toTimeString()}* lagi . . .`)
	if (10000 > user.money) return m.reply('Modal Diperlukan !!\nAnda tidak memiliki 💵 10000 Money')
	if (new Date - user2.lastdagang <= cooldown) return m.reply(`Teman anda sedang berdagang , cari partner lain atau tunggu 🕖 *${((user2.lastdagang + cooldown) - new Date()).toTimeString()}* lagi . . .`)
	if (10000 > user2.money) return m.reply('Modal Diperlukan !!\nRekanmu tidak memiliki 💵 10000 Money')
	let dapat
	user.money -= 10000
	user2.money -= 10000
	user.lastdagang = new Date * 1
	user2.lastdagang = new Date * 1
	conn.reply(m.chat, `Mohon bersabar..\nKamu dan ${conn.getName(who)} sedang berdagang.. 😅\n\nModal masing - masing = 💵 10000`, m)
	setTimeout(() => {
		dapat = ranNumb(7000, 12000)
		user.money  += dapat
		user2.money += dapat
		conn.reply(m.chat, `[ Penghasilan Dagang ]\n\n💵 +${dapat} untukmu dan ${conn.getName(who)}`, m)
	}, 1800000)
	setTimeout(() => {
		dapat = ranNumb(7000, 12000)
		user.money  += dapat
		user2.money += dapat
		conn.reply(m.chat, `[ Penghasilan Dagang ]\n\n💵 +${dapat} untukmu dan ${conn.getName(who)}`, m)
	}, 3600000)
	setTimeout(() => {
		dapat = ranNumb(7000, 12000)
		user.money  += dapat
		user2.money += dapat
		conn.reply(m.chat, `[ Penghasilan Dagang ]\n\n💵 +${dapat} untukmu dan ${conn.getName(who)}`, m)
	}, 5400000)
	setTimeout(() => {
		dapat = ranNumb(7000, 12000)
		user.money  += dapat
		user2.money += dapat
		conn.reply(m.chat, `[ Penghasilan Dagang ]\n\n💵 +${dapat} untukmu dan ${conn.getName(who)}`, m)
	}, 72000000)
}

handler.menufun = ['berdagang']
handler.tagsfun = ['rpg']
handler.command = /^((ber)?dagang)$/i

handler.cooldown = cooldown
handler.group = true
handler.limit = true

export default handler