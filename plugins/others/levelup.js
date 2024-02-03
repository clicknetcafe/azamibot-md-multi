import db from '../../lib/database.js'
import { canLevelUp, xpRange } from '../../lib/levelling.js'
import { levelup } from '../../lib/canvas.js'
import uploadImage from '../../lib/uploadImage.js'
import { ranNumb, padLead } from '../../lib/func.js'

let handler = async (m, { conn }) => {
	let user = db.data.users[m.sender]
	let name = await conn.getName(m.sender)
	if (!canLevelUp(user.level, user.exp, global.multiplier)) {
		let { min, xp, max } = xpRange(user.level, global.multiplier)
		let txt = `Level *${user.level} (${user.exp - min}/${xp})*\nKurang *${max - user.exp}* lagi!`
		try {
			const can = await import('knights-canvas')
			let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/avatar_contact.jpg')
			let bg = await (await fetch('https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/menus.json')).json().then(v => v.getRandom())
			let img = await (await new can.Rank().setAvatar(pp).setUsername(await conn.getName(m.sender)).setBg(bg).setNeedxp(xp).setCurrxp(`${user.exp - min}`).setLevel(user.level).setRank('https://i.ibb.co/Wn9cvnv/FABLED.png').toAttachment()).toBuffer()
			await conn.sendFile(m.chat, img, '', txt, m)
		} catch {
			m.reply(txt)
		}
	} else {
		let before = user.level * 1
		while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
		user.role = await global.rpg.role(user.level).name
		if (before !== user.level) {
			let img, txt = `Selamat 🥳, anda telah naik level!\n\n• 🧬 *Level Up : ${before} -> ${user.level}*\n_semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_`
			try {
				const can = await import('knights-canvas')
				let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/avatar_contact.jpg')
				img = await (await new can.Up().setAvatar(pp).toAttachment()).toBuffer()
				await conn.sendFile(m.chat, img, '', txt, m)
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