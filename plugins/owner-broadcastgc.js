import { delay, ranNumb } from '../lib/others.js'

let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
	let groups
	try { groups = Object.values(await conn.groupFetchAllParticipating()) }
	catch { return }
	let img, q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || q.mtype || ''
	if (mime) img = await q.download?.()
	conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} chat_`, m)
	let teks = command.includes('meme') ? `${text}\n\n_*「 BroadCast-Bot 」*_` : `_*「 BroadCast-Bot 」*_\n\n${text}`
	for (let x of groups) {
		let bot = x.participants.filter(x => x.id == conn.user.jid)
		if (x.restrict && bot[0].admin != 'admin') {}
		else {
			if (/image|video|viewOnce/g.test(mime)) await conn.sendFile(x.id, img, '', teks)
			else await conn.reply(x.id, teks)
		}
		await delay(ranNumb(2000, 5500))
	}
	await m.reply('Selesai Broadcast All Group Chat :)')
}

handler.menuowner = ['bcgroup', 'bcgroupmeme']
handler.tagsowner = ['owner']
handler.command = /^((bc|broadcast)(gc|gro?ups?)(meme)?)$/i

handler.owner = true

export default handler