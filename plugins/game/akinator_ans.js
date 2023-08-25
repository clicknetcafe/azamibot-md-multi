import db from '../../lib/database.js'
import { somematch } from '../../lib/func.js'

const teks = '0 - Ya\n1 - Tidak\n2 - Saya Tidak Tau\n3 - Mungkin\n4 - Mungkin Tidak\n5 - Kembali ke pertanyaan sebelumnya'

export async function before(m) {
	if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text) return !1
	let user = db.data.users[m.sender]
	let aki = m.isGroup ? db.data.chats[m.chat].akinator : user.akinator
	if (!aki.sesi || m.quoted.id != aki.soal.key.id) return
	if (!somematch(['0','1','2','3','4','5'], m.text)) return this.reply(m.chat, `[!] Jawab dengan angka 1, 2, 3, 4, atau 5\n\n${teks}`, aki.soal)
	let { server, frontaddr, session, signature, question, progression, step } = aki
	if (step == '0' && m.text == '5') return m.reply('Anda telah mencapai pertanyaan pertama')
	try {
		user.spamcount += 1
		let anu = await (await fetch(`https://api.lolhuman.xyz/api/akinator/${m.text == '5' ? 'back' : 'answer'}?apikey=${api.lol}&server=${server}${m.text == '5' ? `&session=${session}&signature=${signature}&step=${step}` : `&frontaddr=${frontaddr}&session=${session}&signature=${signature}&step=${step}&answer=${m.text}`}`)).json()
		if (anu.status != 200) {
			aki.sesi = false
			aki.soal = null
			return m.reply(anu.message)
		}
		anu = anu.result
		if (anu.name) {
			await this.sendMsg(m.chat, { image: { url: anu.image }, caption: `🎮 *Akinator Answer* 🎮\n\nDia adalah *${anu.name}*\n_${anu.description}_`, mentions: [m.sender] }, { quoted: m })
			aki.sesi = false
			aki.soal = null
		} else {
			let soal = await this.reply(m.chat, `🎮 *Akinator* 🎮\n_step ${anu.step} ( ${anu.progression.toFixed(2)} % )_\n\n@${m.sender.split('@')[0]}\n    ${anu.question}\n\n${teks}`, m, { mentions: [m.sender] })
			aki.soal = soal
			aki.step = anu.step
			aki.progression = anu.progression
		}
	} catch (e) {
		console.log(e)
		aki.sesi = false
		aki.soal = null
		m.reply('server down')
	}
	return !0
}