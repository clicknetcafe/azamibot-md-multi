import db from '../../lib/database.js'

const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
const linkLain = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/g

export async function before(m, { isAdmin, text, isBotAdmin }) {
	if (!m.isGroup) return !1
	let chat = db.data.chats[m.chat]
	const isGroupLink = linkRegex.exec(m.text)
	if (chat.antiLink && isGroupLink && !isAdmin) {
		if (isBotAdmin) {
			const p = await this.groupInviteCode(m.chat)
			const linkThisGroup = `https://chat.whatsapp.com/${p}`
			text = [...m.text.matchAll(linkLain)].map(v => v[1]).filter(v => !v.includes(p))
			if (m.text.includes(linkThisGroup) && text.length == 0) return !0
		}
		if (!m.fromMe && isBotAdmin) await this.sendMsg(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender } })
		await this.reply(m.chat, `@${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')} *terdeteksi* mengirim Link Group!`, fkontak, { mentions: [m.sender] })
	}
	return !0
}