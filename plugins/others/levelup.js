import got from 'got'
import db from '../../lib/database.js'
import { canLevelUp, xpRange } from '../../lib/levelling.js'
import { levelup } from '../../lib/canvas.js'
import uploadImage from '../../lib/uploadImage.js'
import { ranNumb, padLead } from '../../lib/func.js'

let handler = async (m, { conn }) => {
	let user = db.data.users[m.sender]
	let name = await conn.getName(m.sender)
	let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/avatar_contact.jpg')
	let ana = await uploadImage(await got(pp).buffer())
	let meh = padLead(ranNumb(43), 3)
	let nais = `https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/picbot/menus/menus_${meh}.jpg`
	if (!canLevelUp(user.level, user.exp, global.multiplier)) {
		let { min, xp, max } = xpRange(user.level, global.multiplier)
		let txt = `Level *${user.level} (${user.exp - min}/${xp})*\nKurang *${max - user.exp}* lagi!`
		try {
			let role = await global.rpg.role(user.level).name.split(' ')
			await conn.sendFile(m.chat, `https://api.siputzx.my.id/api/canvas/profile?backgroundURL=${nais}&avatarURL=${ana}&rankName=${role[0]}&rankId=${role[1] || '-'}&requireExp=${xp}&level=${user.level}&name=${name}&exp=${user.exp - min}`, '', txt, m)
		} catch {
			m.reply(txt)
		}
	} else {
		let before = user.level * 1
		while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
		if (before !== user.level) {
			let img, txt = `Selamat 🥳, anda telah naik level!\n\n• 🧬 *Level Up : ${before} -> ${user.level}*\n_semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_`
			try {
				await conn.sendFile(m.chat, `https://api.siputzx.my.id/api/canvas/level-up?backgroundURL=${nais}&avatarURL=${ana}&fromLevel=${before}&toLevel=${user.level}&name=${name}`, '', txt, m)
			} catch {
				try {
					img = await levelup(`🥳 ${name.replaceAll('\n','')} naik 🧬level`, user.level)
					await conn.sendFile(m.chat, img, 'levelup.jpg', txt, m)
				} catch {
					m.reply(txt)
				}
			}
		}
	}
}

handler.menufun = ['levelup']
handler.tagsfun = ['rpg']
handler.command = /^(level(up)?)$/i

export default handler