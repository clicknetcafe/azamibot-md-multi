import db from '../../lib/database.js'

export async function before(m) {
	let rvo = db.data.datas.rvo
	let msg = m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2?.message
	if (!msg) return !1
	let mtype = Object.keys(msg)[0]
	if (!msg[mtype].mediaKey) return !1
	msg = msg[mtype]
	if (rvo.find(v => v?.mediaKey == msg.mediaKey)) return !1
	rvo.push({ url: msg.url, mediaKey: msg.mediaKey, directPath: msg.directPath })
	if (rvo.length > 100) db.data.datas.rvo.shift()
	return !0
}