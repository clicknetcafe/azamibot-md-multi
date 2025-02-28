import db from '../../lib/database.js'
import { delay } from '../../lib/func.js'

const linkRegex = /(chat\.)?whatsapp\.com\/(?:invite\/)?(?:channel\/)?([0-9A-Za-z]{20,27})/i
const linkLain  = /(chat\.)?whatsapp\.com\/(?:invite\/)?(?:channel\/)?([0-9A-Za-z]{20,27})/g
const urls = ['https://pppp.com', 'https://xxxx.com']

export async function before(m, { isAdmin, text, isBotAdmin }) {
	if (!m.isGroup || m.fromMe) return !1
	let chat = db.data.chats[m.chat]
	let danger = urls.some(v => m.text?.includes(v))
	let newsletter = m.message?.extendedTextMessage?.contextInfo?.forwardedNewsletterMessageInfo ? true : false
	const isGroupLink = linkRegex.exec(m.text) ? linkRegex.exec(m.text) : newsletter ? newsletter : danger
	if (chat.antiLink && isGroupLink && !isAdmin) {
		if (isBotAdmin) {
			const p = await this.groupInviteCode(m.chat).catch(_ => 'B8EGFtWH2OHGphbexc1Mdy')
			const linkThisGroup = `chat.whatsapp.com/${p}`
			text = [...m.text.matchAll(linkLain)].map(v => v[0]).filter(v => !v.includes(p))
			if (!newsletter && m.text.includes(linkThisGroup) && text.length == 0) return !0
		}
		if (!m.fromMe && isBotAdmin) {
			await this.sendMsg(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender } })
			if (!newsletter && !danger) await this.reply(m.chat, `@${(m.sender || '')
				.replace(/@s\.whatsapp\.net/g, '')} *terdeteksi* mengirim Link ${m.text
				.includes('/channel/') ? 'Channel' : danger ? 'Berbahaya' : 'Group'}!`, fkontak, { mentions: [m.sender] })
			if (chat.antiLinkKick) {
				m.reply('Anda akan di kick sesaat lagi...')
				await delay(3000)
				await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
			}
		}
	}
	return !0
}