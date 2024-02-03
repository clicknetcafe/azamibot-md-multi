import db from '../../lib/database.js'
import { canLevelUp } from '../../lib/levelling.js'
import { levelup } from '../../lib/canvas.js'

export async function before(m) {
	if (process.uptime() < 600) return !1 // won't respond in 10 minutes (60x10), avoid spam while LoadMessages
	let user = db.data.users[m.sender]
	if (!user?.autolevelup) return !1
	if (m.isGroup && !db.data.chats[m.chat].autolevelup) return !1
	let before = user.level * 1
	while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
	user.role = await global.rpg.role(user.level).name
	if (before !== user.level) {
		let img, name = await this.getName(m.sender)
		let txt = `Selamat 🥳, anda telah naik level!\n\n• 🧬 *Level Up : ${before} -> ${user.level}*\n_semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_`
		try {
			const can = await import('knights-canvas')
			let pp = await this.profilePictureUrl(m.sender, 'image').catch(_ => 'https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/avatar_contact.jpg')
			img = await (await new can.Up().setAvatar(pp).toAttachment()).toBuffer()
			await this.sendFile(m.chat, img, '', txt, m)
		} catch {
			try {
				img = await levelup(`🥳 ${name.replaceAll('\n','')} naik 🧬level`, user.level)
				await this.sendFile(m.chat, img, 'levelup.jpg', txt, m)
			} catch {
				await this.reply(m.chat, txt, fkontak)
			}
		}
	}
	return !0
}

export const disabled = false