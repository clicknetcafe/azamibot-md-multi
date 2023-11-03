import db from '../../lib/database.js'

export async function before(m) {
	if (!m.isGroup) return !1
	if (db.data.chats[m.chat].viewonce && m.message?.[m.mtype]?.viewOnce) {
		let buffer = await m.download()
		let i = `[ ANTIVIEWONCE AKTIF ]\n\n👾 *Sender* : @${m.sender.split`@`[0]}${m.text ? `\n\n*Caption :*\n${m.text}` : ''}`
		if (/audio/.test(m.mtype)) {
			let amsg = await this.sendMsg(m.chat, { audio: buffer, ptt: true })
			await this.reply(m.chat, `[ ANTIVIEWONCE AUDIO ]\n\n👾 *Sender* : @${m.sender.split`@`[0]}`, amsg, { mentions: [m.sender] })
		} else await this.sendFile(m.chat, buffer, '', i, null, false, { mentions: [m.sender, ...this.parseMention(i)], quoted: m })
	}
	return !0
}