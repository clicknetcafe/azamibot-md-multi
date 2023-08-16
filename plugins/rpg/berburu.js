import db from '../../lib/database.js'
import { ranNumb } from '../../lib/func.js'

const cooldown = 259200000
const cooldownn = 180000

let handler = async (m, { conn, usedPrefix }) => {
	let user = db.data.users[m.sender]
	if (new Date - user.lasthunt <= cooldown) return m.reply(`📍 Sudah cukup perburuan kali ini\nGunakan waktu yang ada untuk beristirahat, perburuan selanjutnya dapat dimulai dalam . . .\n🕖 *${((user.lasthunt + cooldown) - new Date()).toTimeString()}*`)
	if (user.armor == 0 || user.sword == 0 || user.bow == 0) return m.reply(`Perlu *${usedPrefix}craft* armor, sword, dan bow terlebih dahulu.\n\nAnda memiliki :\n━ 🥼 ${user.armor} Armor\n━ ⚔️ ${user.sword} Sword\n━ 🏹 ${user.bow} Bow`)
	let buruan = [
		{"hewan": 0}, {"hewan": 0}, {"hewan": 0}, {"hewan": 0}, {"hewan": 0}, {"hewan": 0},
		{"hewan": 0}, {"hewan": 0}, {"hewan": 0}, {"hewan": 0}, {"hewan": 0}, {"hewan": 0}
	]

	for (let x of buruan) {
		let random = ranNumb(0, 6)
		x.hewan += random
	}

	let gmbrt = 'https://telegra.ph/file/295a6d5105771875e1797.jpg'
	let hsl = `[ *Perburuan Selesai* ]\nHasil tangkapan hari ini :

 *🐂 = [ ${buruan[0].hewan} ]*			 *🐃 = [ ${buruan[6].hewan} ]*
 *🐅 = [ ${buruan[1].hewan} ]*			 *🐮 = [ ${buruan[7].hewan} ]*
 *🐘 = [ ${buruan[2].hewan} ]*			 *🐒 = [ ${buruan[8].hewan} ]*
 *🐐 = [ ${buruan[3].hewan} ]*			 *🐗 = [ ${buruan[9].hewan} ]*
 *🐼 = [ ${buruan[4].hewan} ]*			 *🐖 = [ ${buruan[10].hewan} ]*
 *🐊 = [ ${buruan[5].hewan} ]*			 *🐓 = [ ${buruan[11].hewan} ]*`

 	user.armordurability -= ranNumb(80, 120)
 	user.sworddurability -= ranNumb(80, 120)
 	user.bowdurability -= ranNumb(80, 120)
 	if (user.armordurability <= 0) {
 		user.armordurability = 0
 		user.armor = 0
 	}
 	if (user.sworddurability <= 0) {
 		user.sworddurability = 0
 		user.sword = 0
 	}
 	if (user.bowdurability <= 0) {
 		user.bowdurability = 0
 		user.bow = 0
 	}

	setTimeout(() => {
		user.banteng	+= buruan[0].hewan
		user.harimau	+= buruan[1].hewan
		user.gajah		+= buruan[2].hewan
		user.kambing	+= buruan[3].hewan
		user.panda		+= buruan[4].hewan
		user.buaya		+= buruan[5].hewan
		user.kerbau		+= buruan[6].hewan
		user.sapi		+= buruan[7].hewan
		user.monyet		+= buruan[8].hewan
		user.babihutan	+= buruan[9].hewan
		user.babi		+= buruan[10].hewan
		user.ayam		+= buruan[11].hewan
		conn.sendFile(m.chat, gmbrt, '', hsl, m)
	}, cooldownn)
					 
	setTimeout(() => {
		m.reply('_Perburuan Dimulai..._')
	}, 0)
	user.lasthunt = new Date * 1
}

handler.menufun = ['berburu']
handler.tagsfun = ['rpg']
handler.command = /^(berburu|hunt)$/i

handler.cooldown = cooldown
handler.premium = true

export default handler