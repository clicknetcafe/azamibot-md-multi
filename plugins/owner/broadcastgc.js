import { delay, ranNumb, padLead } from '../../lib/func.js'
import db from '../../lib/database.js'
const { proto } = await (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let groups = Object.values(await conn.groupFetchAllParticipating()).filter(v => v.participants.find(v => v.id == conn.user.jid) != undefined)
	let img, thumb, q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (mime) img = await q.download()
	m.reply(`_Mengirim pesan broadcast ke ${groups.length} chat_`)
	let teks = `_*「 BroadCast-Bot 」*_${!text ? '' : ('\n\n'+text)}`
	if (/audio/.test(mime)) thumb = `https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/picbot/menus/menus_${padLead(ranNumb(43), 3)}.jpg`
	for (let x of groups) {
		if (x.announce && !x.participants.find(v => v.id == conn.user.jid).admin) console.log(x.id+'\ngroup closed / bot not admin')
		else {
			try {
				if (db.data.chats[x.id].owneronly) continue
				let msg, tag = /tag/.test(command) ? x.participants.map(v => v.id) : []
				if (/image|video/g.test(mime) && !/webp/.test(mime)) msg = await conn.sendMsg(x.id, { [/image/.test(mime) ? 'image' : 'video']: img, caption: teks }, { quoted: fkontakbot, mentions: tag })
				else if (/audio/.test(mime)) msg = await conn.sendFAudio(x.id, { audio: img, mimetype: 'audio/mpeg', ptt: true }, fkontakbot, text || pauthor, thumb, db.data.datas.linkgc)
				else msg = await conn.reply(x.id, teks, fkontakbot, { mentions: tag })
				if (/pin/.test(command)) await conn.sendMsg(x.id, { pin: msg.key, type: proto.PinInChat.Type.PIN_FOR_ALL, time: 86400})
				await delay(ranNumb(2000, 5500))
			} catch (e) {
				console.log(e)
			}
		}
	}
	await m.reply('Selesai Broadcast All Group Chat :)')
}

handler.menuowner = ['bcgroup']
handler.tagsowner = ['owner']
handler.command = /^((bc|broadcast)(gc|gro?ups?)((hide)?tag)?(pin)?)$/i

handler.owner = true

export default handler