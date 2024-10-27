import db from '../../lib/database.js'

const uncheckregex = /idgroup|groupid|unchek|suntik|set andro|andro|jpm|uncheck|uncehek|Uncehk|unchek|ungcek|jasteb|jasher|jashare|jasa share|bokep|open bo|vcs|clmk|colmek|okep|jasa up|jasa upgrade|sange|rege|hack|checker|cheker|phising|depo|pushkon|puskontak|puskon|puskontak|pushcontact|puscontact|pushkontak|ᴊpᴍ|uncek/i
const linkGcRegex = /(chat\.)?whatsapp\.com\/(?:invite|channel\/)?([0-9A-Za-z]{20,27})/g

export async function before(m, { isAdmin, text, isBotAdmin }) {
	if (!m.isGroup) return !1
	let chat = db.data.chats[m.chat]
	const isUncheckText = uncheckregex.exec(m.text)
	if (chat.antiUncheck && isUncheckText && !isAdmin) {
		if (isBotAdmin) {
			const p = await this.groupInviteCode(m.chat).catch(_ => 'B8EGFtWH2OHGphbexc1Mdy')
			const linkThisGroup = `chat.whatsapp.com/${p}`
			text = [...m.text.matchAll(linkGcRegex)].map(v => v[0]).filter(v => !v.includes(p))
			if (m.text.includes(linkThisGroup) && text.length == 0) return !0
			if (isUncheckText && !containsUrl(m.text)) return !0
		}
		if (!m.fromMe && isBotAdmin) await this.sendMsg(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender } })
		await this.reply(m.chat, `@${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')} *terdeteksi* mengirim Uncheck!`, fkontak, { mentions: [m.sender] })
	}
	return !0
}

function containsUrl(text) {
	const urlRegex = /(https?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]/g;
	return urlRegex.test(text);
}