import db from '../../lib/database.js'
import { ranNumb } from '../../lib/func.js'

const cooldown = 43200000
const cooldownn = 180000

let handler = async (m, { conn, command, usedPrefix }) => {
	let user = db.data.users[m.sender]
	if (new Date - user.lastfishing <= cooldown) return m.reply(`📍 Anda sudah memancing, selanjutnya dapat dilakukan dalam  . . .\n🕖 *${((user.lastfishing + cooldown) - new Date()).toTimeString()}*`)
	if (user.fishingrod == 0) return m.reply(`Perlu *${usedPrefix}craft* fishingrod terlebih dahulu.\n\nAnda memiliki :\n━ 🎣 ${user.fishingrod} FishingRod`)
	let mancing = [
		{"ikan": 0}, {"ikan": 0}, {"ikan": 0}, {"ikan": 0}, {"ikan": 0}, {"ikan": 0},
		{"ikan": 0}, {"ikan": 0}, {"ikan": 0}, {"ikan": 0}, {"ikan": 0}, {"ikan": 0}, {"ikan": 0}
	]

	for (let x of mancing) {
		let random = ranNumb(0, 2)
		x.ikan += random
	}

	let gmbrt = 'https://telegra.ph/file/4a2dad6f0f6dfef650bf3.jpg'
	let hsl = `[ *Mancing Selesai* ]\nHasil tangkapan hari ini :

 *🐋 = [ ${mancing[0].ikan} ]*			 *🐡 = [ ${mancing[6].ikan} ]*
 *🐳 = [ ${mancing[1].ikan} ]*			 *🐠 = [ ${mancing[7].ikan} ]*
 *🐬 = [ ${mancing[2].ikan} ]*			 *🦀 = [ ${mancing[8].ikan} ]*
 *🦈 = [ ${mancing[3].ikan} ]*			 *🦞 = [ ${mancing[9].ikan} ]*
 *🐟 = [ ${mancing[4].ikan} ]*			 *🐙 = [ ${mancing[10].ikan} ]*
 *🐟 = [ ${mancing[5].ikan} ]*			 *🦑 = [ ${mancing[11].ikan} ]*
 *🦐 = [ ${mancing[12].ikan} ]*`

	user.fishingroddurability -= ranNumb(80, 120)
 	if (user.fishingroddurability <= 0) {
 		user.fishingroddurability = 0
 		user.fishingrod = 0
 	}

	setTimeout(() => {
		user.orca		+= mancing[0].ikan
		user.paus		+= mancing[1].ikan
		user.lumba		+= mancing[2].ikan
		user.hiu		+= mancing[3].ikan
		user.ikan		+= mancing[4].ikan
		user.lele		+= mancing[5].ikan
		user.bawal		+= mancing[6].ikan
		user.nila		+= mancing[7].ikan
		user.kepiting	+= mancing[8].ikan
		user.lobster	+= mancing[9].ikan
		user.gurita		+= mancing[10].ikan
		user.cumi		+= mancing[11].ikan
		user.udang		+= mancing[12].ikan
		conn.sendFile(m.chat, gmbrt, '', hsl, m)
	}, cooldownn)
					 
	setTimeout(() => {
		m.reply('_Sedang memancing..._')
	}, 0)
	user.lastfishing = new Date * 1
	user.mancingcount += 1
}

handler.menufun = ['mancing']
handler.tagsfun = ['rpg']
handler.command = /^(mancing|fishing)$/i

handler.cooldown = cooldown
handler.premium = true

export default handler