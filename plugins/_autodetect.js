import { WAMessageStubType } from '@whiskeysockets/baileys'
import Connection from '../lib/connection.js'
import fetch from 'node-fetch'
import db from '../lib/database.js'

export async function before(m) {
	if (!m.messageStubType || !m.isGroup) return;
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
		await this.reply(m.chat, `${edtr} telah *${m.messageStubParameters[0] == 'on' ? 'menutup' : 'membuka'}* grup!\nSekarang ${m.messageStubParameters[0] == 'on' ? 'hanya admin yang' : 'semua peserta'} dapat mengirim pesan.`, fkontak, { mentions: [m.sender] })
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
		let user = m.messageStubParameters[0]
		let id = m.chat
		let chat = db.data.chats[m.chat]
		if (!chat.welcome) return !1
		let groupMetadata = await Connection.store.fetchGroupMetadata(id, this.groupMetadata)
		await this.reply(m.chat, (m.messageStubType == 27 ? (chat.sWelcome || this.welcome || Connection.conn.welcome || 'Welcome, @user!').replace('@subject', await this.getName(m.chat)).replace('@desc', groupMetadata.desc?.toString() || 'unknown') :
				(chat.sBye || this.bye || Connection.conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0]), fkontak, { mentions: [user] })
	} else {
		console.log({
			messageStubType: m.messageStubType,
			messageStubParameters: m.messageStubParameters,
			type: WAMessageStubType[m.messageStubType],
		});
	}
}

export const disabled = false