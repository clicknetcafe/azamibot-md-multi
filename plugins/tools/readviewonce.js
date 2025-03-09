import db from '../../lib/database.js'

let handler = async (m, { conn }) => {
	let q = m.quoted ? m.quoted : m
	if (!q.viewOnce) throw 'Itu bukan pesan viewOnce'
	let txt = q.caption || ''
	try {
		let msg = q.message?.[Object.keys(q.message)[0]] || q.mediaMessage?.[Object.keys(q.mediaMessage)[0]] || null
		let rvo = db.data.datas.rvo
		let tes = rvo.find(v => v?.url == msg.url)
		if (tes) q.message = tes.msg
		await conn.sendFile(m.chat, await q.download(), '', txt, null, true, { mentions: conn.parseMention(txt), quoted: m })
	} catch (e) {
		console.log(e)
		m.reply('already opened')
	}
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^((read)?viewonce|rvo)$/i

export default handler
