import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, isPrems }) => {
	if (!isPrems) return m.reply(`「 PREMIUM USER ONLY 」`)
	let prems = db.data.datas.prems.filter(v => v.user !== '')
	prems = prems.sort((a, b) => a.date - b.date)
	if (prems.length == 0) return m.reply (`Tidak ada user premium !`)
	let txt = `*Total Premium : ${prems.length} User*`
	let namabot = await conn.getName(conn.user.jid)
	for (let i of prems) {
		let namausr = await conn.getName(i.user)
		txt += `\n\n✨ ${(namabot == namausr) ? '' : namausr + ' '} ( +${i.user.split('@')[0]} )\n`
		txt += `Sisa Waktu : ${((i.date) - new Date()).toTimeString()}\n`
		txt += `───────────────────`
	}
	await m.reply(txt)
}

handler.menugroup = ['listprem']
handler.tagsgroup = ['group']
handler.command = /^(listprem|premlist)$/i

export default handler