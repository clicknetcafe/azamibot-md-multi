import uploadImage from '../../lib/uploadImage.js'
import db from '../../lib/database.js'
import Connection from '../../lib/connection.js'

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
			const can = await import('knights-canvasx')
			let bg = await (await fetch('https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/menus.json')).json().then(v => v.getRandom())
			let name = await conn.getName(m.sender)
			let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/VHXK4kV/avatar-contact.png')
			let ppgc = await conn.profilePictureUrl(m.chat, 'image').catch(_ => 'https://i.ibb.co/VHXK4kV/avatar-contact.png')
			pp = await (await (add ? new can.Welcome() : new can.Goodbye()).setUsername(name).setGuildName(namegc).setGuildIcon(ppgc).setMemberCount(meta.participants.length).setAvatar(pp).setBackground(bg).toAttachment()).toBuffer()
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