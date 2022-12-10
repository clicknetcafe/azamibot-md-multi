import db from '../lib/database.js'

let handler = async(m) => {
	let a = await db.data.datas.menfess
	if (a.length > 2000) {
		let half = await Math.floor(a.length / 2)
		let array1 = await a.slice(half, a.length)
		db.data.datas.menfess = await array1
		await m.reply(`[ Sukses ]\n\nData menfess sekarang : *${array1.length}* ${array1.length > 2000 ? '( dapat dikurangi lagi )' : ''}`)
	} else {
		m.reply(`[ ! ] Data sampah menfess harus *di atas 2000*.\n\nData menfes sekarang : *${a.length}*`)
	}
}

handler.menuowner = ['menfessdel']
handler.tagsowner = ['ownerr']
handler.command = /^(me(m|n)fess?del(ete)?|del(ete)?me(m|n)fess?)$/i

handler.rowner = true

export default handler