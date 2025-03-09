import db from '../../lib/database.js'

export async function before(m) {
	let rvo = db.data.datas.rvo
	let msg = m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2?.message
	if (!msg) return !1
	let mtype = Object.keys(msg)[0]
	if (!msg[mtype].url) return !1
	let ms = msg[mtype]
	if (rvo.find(v => v?.url == ms.url)) return !1
	rvo.push({ url: ms.url, msg })
	if (rvo.length > 100) db.data.datas.rvo.shift()
	return !0
}