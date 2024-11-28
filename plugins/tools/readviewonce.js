import db from '../../lib/database.js'

let handler = async (m, { conn }) => {
	let q = m.quoted ? m.quoted : m
	if (!q.viewOnce) throw 'Itu bukan pesan viewOnce'
	let txt = q.caption || ''
	try {
		let msg = q.message?.[Object.keys(q.message)[0]] || null
		if (msg && !msg.mediaKey) {
			let rvo = db.data.datas.rvo
			let tes = rvo.find(v => v?.url == msg.url)
			if (tes) {
				q.message[Object.keys(q.message)[0]].mediaKey = tes.mediaKey
    			q.message[Object.keys(q.message)[0]].directPath = tes.directPath
			}
		}
		await conn.sendFile(m.chat, await q.download(), '', txt, null, true, { mentions: conn.parseMention(txt), quoted: m })
	} catch (e) {
		console.log(e)
		throw 'already opened'
	}
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^((read)?viewonce|rvo)$/i

export default handler
