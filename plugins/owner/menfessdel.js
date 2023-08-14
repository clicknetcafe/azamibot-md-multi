import db from '../../lib/database.js'

let handler = async(m) => {
	let menfess = db.data.datas.menfess
	let a = Object.keys(menfess)
	if (a.length < 2000) throw `[ ! ] Data sampah menfess harus *di atas 2000*.\n\nData menfes sekarang : *${a.length}*`
	let half = await Math.floor(a.length / 2)
	a = a.slice(0, half)
	for (let x of a) { delete menfess[x] }
	await m.reply(`[ Sukses ]\n\nData menfess sekarang : *${a.length}* ${a.length > 2000 ? '( dapat dikurangi lagi )' : ''}`)
}

handler.menuowner = ['menfessdel']
handler.tagsowner = ['ownerr']
handler.command = /^(me(m|n)fess?del(ete)?|del(ete)?me(m|n)fess?)$/i

handler.rowner = true

export default handler