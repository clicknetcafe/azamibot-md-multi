import { WAMessageStubType } from '@whiskeysockets/baileys'
import Connection from '../../lib/connection.js'
import db from '../../lib/database.js'

export async function before(m) {
	if (!m.messageStubType || !m.isGroup) return !1
	//if (/120363045913621594|120363024788895179|120363025272391108/.test(m.chat)) return !1
	let edtr = `@${m.sender.split`@`[0]}`
	if (m.messageStubType == 21) {
		await this.reply(m.chat, `${edtr} mengubah Subject Grup menjadi :\n*${m.messageStubParameters[0]}*`, fkontak, { mentions: [m.sender] })
	} else if (m.messageStubType == 22) {
		await this.reply(m.chat, `${edtr} telah mengubah icon grup.`, fkontak, { mentions: [m.sender] })
	} else if (m.messageStubType == 1 || m.messageStubType == 23 || m.messageStubType == 132) {
		await this.reply(m.chat, `${edtr} *mereset* link grup!`, fkontak, { mentions: [m.sender] })
	} else if (m.messageStubType == 24) {
		await this.reply(m.chat, `${edtr} mengubah deskripsi grup.\n\n${m.messageStubParameters[0]}`, fkontak, { mentions: [m.sender] })
	} else if (m.messageStubType == 25) {
		await this.reply(m.chat, `${edtr} telah mengatur agar *${m.messageStubParameters[0] == 'on' ? 'hanya admin' : 'semua peserta'}* yang dapat mengedit info grup.`, fkontak, { mentions: [m.sender] })
	} else if (m.messageStubType == 26) {
		const ms = /on/.test(m.messageStubParameters[0])
		await this.reply(m.chat, `${edtr} telah *${ms ? 'menutup' : 'membuka'}* grup!\nSekarang ${ms ? 'hanya admin yang' : 'semua peserta'} dapat mengirim pesan.`, fkontak, { mentions: [m.sender] })
		db.data.chats[m.chat].autolevelup = false
	} else if (m.messageStubType == 28) {
		await this.reply(m.chat, `${edtr} telah mengeluarkan @${m.messageStubParameters[0].split`@`[0]} dari grup.`, fkontak, { mentions: [m.sender, m.messageStubParameters[0]] })
	} else if (m.messageStubType == 29) {
		await this.reply(m.chat, `${edtr} telah menjadikan @${m.messageStubParameters[0].split`@`[0]} sebagai admin.`, fkontak, { mentions: [m.sender, m.messageStubParameters[0]] })
	} else if (m.messageStubType == 30) {
		await this.reply(m.chat, `${edtr} telah memberhentikan @${m.messageStubParameters[0].split`@`[0]} dari admin.`, fkontak, { mentions: [m.sender, m.messageStubParameters[0]] })
	} else if (m.messageStubType == 72) {
		await this.reply(m.chat, `${edtr} mengubah durasi pesan sementara menjadi *@${m.messageStubParameters[0]}*`, fkontak, { mentions: [m.sender] })
	} else if (m.messageStubType == 123) {
		await this.reply(m.chat, `${edtr} *menonaktifkan* pesan sementara.`, fkontak, { mentions: [m.sender] })
	} else if (m.messageStubType == 32 || m.messageStubType == 27) {
		if (process.uptime() < 300) return !1 // won't respond in 5 minutes (60x5), avoid spam while LoadMessages
		let add = m.messageStubType == 27 ? true : false
		let user = m.messageStubParameters[0]
		let id = m.chat
		let chat = db.data.chats[id]
		if (!chat.welcome) return !1
		let meta = await Connection.store.fetchGroupMetadata(id, this.groupMetadata)
		let bg = await (await fetch('https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/menus.json')).json().then(v => v.getRandom())
		let name = await this.getName(user)
		let namegc = await this.getName(id)
		let pp = await this.profilePictureUrl(user, 'image').catch(_ => 'https://i.ibb.co/VHXK4kV/avatar-contact.png')
		let ppgc = await this.profilePictureUrl(id, 'image').catch(_ => 'https://i.ibb.co/VHXK4kV/avatar-contact.png')
		let text = (add ? (chat.sWelcome || this.welcome || Connection.conn.welcome || 'Welcome, @user!').replace('@subject', namegc).replace('@desc', meta.desc?.toString() || '~') : (chat.sBye || this.bye || Connection.conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
		try {
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
			await this.sendFile(id, pp, '', text, fkontak, false, { mentions: [user] })
		} catch (e) {
			console.log(e)
			await this.reply(id, text, fkontak, { mentions: [user] })
		}
	} else {
		console.log({
			messageStubType: m.messageStubType,
			messageStubParameters: m.messageStubParameters,
			type: WAMessageStubType[m.messageStubType],
		});
	}
	return !0
}

export const disabled = false