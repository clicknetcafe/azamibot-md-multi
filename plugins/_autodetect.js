import { WAMessageStubType } from '@adiwajshing/baileys'

export async function before(m) {
	if (!m.messageStubType || !m.isGroup) return;
	let edtr = `@${m.sender.split`@`[0]}`
	if (m.messageStubType == 21) {
		await this.sendMessage(m.chat, { text: `${edtr} mengubah Subject Grup menjadi :\n*${m.messageStubParameters[0]}*`, mentions: [m.sender] }, { quoted: fkontak })
	} else if (m.messageStubType == 22) {
		await this.sendMessage(m.chat, { text: `${edtr} telah mengubah icon grup.`, mentions: [m.sender] }, { quoted: fkontak })
	} else if (m.messageStubType == 1 || m.messageStubType == 23 || m.messageStubType == 132) {
		await this.sendMessage(m.chat, { text: `${edtr} *mereset* link grup!\n\n`, mentions: [m.sender] }, { quoted: fkontak })
	} else if (m.messageStubType == 24) {
		await this.sendMessage(m.chat, { text: `${edtr} mengubah deskripsi grup.\n\n${m.messageStubParameters[0]}`, mentions: [m.sender] }, { quoted: fkontak })
	} else if (m.messageStubType == 25) {
		await this.sendMessage(m.chat, { text: `${edtr} telah mengatur agar *${m.messageStubParameters[0] == 'on' ? 'hanya admin' : 'semua peserta'}* yang dapat mengedit info grup.`, mentions: [m.sender] }, { quoted: fkontak })
	} else if (m.messageStubType == 26) {
		await this.sendMessage(m.chat, { text: `${edtr} telah *${m.messageStubParameters[0] == 'on' ? 'menutup' : 'membuka'}* grup!\nSekarang ${m.messageStubParameters[0] == 'on' ? 'hanya admin yang' : 'semua peserta'} dapat mengirim pesan.`, mentions: [m.sender] }, { quoted: fkontak })
	} else if (m.messageStubType == 29) {
		await this.sendMessage(m.chat, { text: `${edtr} telah menjadikan @${m.messageStubParameters[0].split`@`[0]} sebagai admin.`, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })
	} else if (m.messageStubType == 30) {
		await this.sendMessage(m.chat, { text: `${edtr} telah memberhentikan @${m.messageStubParameters[0].split`@`[0]} dari admin.`, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })
	} else if (m.messageStubType == 72) {
		await this.sendMessage(m.chat, { text: `${edtr} mengubah durasi pesan sementara menjadi *@${m.messageStubParameters[0]}*`, mentions: [m.sender] }, { quoted: fkontak })
	} else if (m.messageStubType == 123) {
		await this.sendMessage(m.chat, { text: `${edtr} *menonaktifkan* pesan sementara.`, mentions: [m.sender] }, { quoted: fkontak })
	} else {
		console.log({
			messageStubType: m.messageStubType,
			messageStubParameters: m.messageStubParameters,
			type: WAMessageStubType[m.messageStubType],
		});
	}
}

export const disabled = false