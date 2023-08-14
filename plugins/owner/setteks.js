import db from '../../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `[ ! ] Input teks.`
	let p = db.data.datas
	if (command.includes('dona')) p.teksdonasi = text
	else if (command.includes('sewa')) p.tekssewa = text
	else p.tekstopup = text
	await m.reply(`Berhasil *${command} :*\n\n${text}`)
}

handler.menuowner = ['donasi','sewa','topup'].map(v => 'setteks' + v)
handler.tagsowner = ['ownerr']
handler.command = /^(setteks(donasi|sewa(bot)?|topup))$/i

handler.rowner = true

export default handler