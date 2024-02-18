import uploadImage from '../../lib/uploadImage.js'
import db from '../../lib/database.js'
import Connection from '../../lib/connection.js'
import { padLead, ranNumb } from '../../lib/func.js'

const thumb = 'https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/avatar_contact.jpg'

let handler = async (m, { conn, usedPrefix, command, args }) => {
	let tx = (args[0] || '').toLowerCase()
	let user = db.data.users[m.sender]
	let chat = db.data.chats[m.chat]
	if (/welcome|leave|bye/.test(tx)) {
		let meta, add = /welcome/.test(tx) ? true : false
		let namegc = m.isGroup ? await conn.getName(m.chat) : '~NamaGroup'
		if (m.isGroup) meta = await Connection.store.fetchGroupMetadata(m.chat, conn.groupMetadata)
		let text = (add ? (chat?.sWelcome || conn.welcome || Connection.conn.welcome || 'Welcome, @user!').replace('@subject', namegc).replace('@desc', meta?.desc?.toString() || '~group deskripsi') : (chat?.sBye || conn.bye || Connection.conn.bye || 'Bye, @user!')).replace('@user', '@' + m.sender.split('@')[0])
		try {
			let meh = padLead(ranNumb(43), 3)
			let bg = `https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/picbot/menus/menus_${meh}.jpg`
			let name = await conn.getName(m.sender)
			let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => thumb)
			let ppgc = await conn.profilePictureUrl(m.chat, 'image').catch(_ => thumb)
			const can = await (await import('canvafy')).default
			pp = await new can.WelcomeLeave()
				.setAvatar(pp)
				.setBackground('image', bg)
				.setTitle(add ? 'Welcome' : 'Goodbye', add ? '#3495eb' : '#eb4034')
				.setDescription(`${add ? 'Hello' : 'Sayonara'} ${name} | ${add ? 'Welcome to' : 'Leaving from'} ${namegc}`, '#34eb7d')
				.setBorder("#2a2e35")
				.setAvatarBorder("#2a2e35")
				.setOverlayOpacity(0.6)
				.build()
			await conn.sendFile(m.chat, pp, '', text, fkontak, false, { mentions: [m.sender] })
		} catch (e) {
			console.log(e)
			await conn.reply(m.chat, text, fkontak, { mentions: [m.sender] })
		}
	} else if (/f(kontak(bot)?|troli|vn|vid|textt)/.test(tx)) {
		await conn.reply(m.chat, `Halo @${m.sender.split('@')[0]}, ini simulasi ${tx}`, /troli/.test(tx) ? ftroli : /vn/.test(tx) ? fvn : /vid/.test(tx) ? fvid : /textt/.test(tx) ? ftextt : /bot/.test(tx) ? fkontakbot : fkontak, { mentions: [m.sender] })
	}

	else m.reply(`*Emulate tersedia :*\n\nwelcome | leave | fkontak | fkontakbot | ftroli | fvn | fvid | ftextt`)
}

handler.menugroup = ['emulate']
handler.tagsgroup = ['group']
handler.command = /^(emulate|simulasi)$/i

handler.limit = true

export default handler