import db from '../../lib/database.js'
import { plugins } from '../../lib/plugins.js'

let handler = async (m) => {
	let totaluser = Object.keys(db.data.users).length
	let stats = Object.entries(db.data.stats).map(([key, val]) => {
		let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' & ') : plugins[key]?.help || key
		if (/exec/.test(name)) return
		return { name, ...val }
	})
	stats = await stats.filter(e => e).sort((a, b) => b.total - a.total)
	let cut = stats.slice(0, 3)
	let txt = `📊 *Database : ${totaluser} User*\n\n`
	txt += `*Command Digunakan :* ${stats.length}\n\n`
	txt += `*Paling sering digunakan :*`
	for (let i of cut) {
		txt += `\n*[ ${i.total} hit ]*`
		txt += `\n┗⊱ ${i.name.replaceAll('.js','')}`
	}
	await m.reply(txt)
}

handler.help = ['database']
handler.tags = ['tools']
handler.command = /^((view|lihat)?database)$/i

export default handler