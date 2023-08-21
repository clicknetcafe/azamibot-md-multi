import { plugins } from '../../lib/plugins.js'

let handler = async (m, { usedPrefix }) => {
	let obj = Object.values(plugins)
	let all = [...new Set(obj.map(v => v = Object.keys(v)[0]))]
	let array = []
	for (let x of all.filter(v => !/ef|ll|mm/i.test(v))) {
		await array.push(obj.filter(v => v[x] && !(v.disabled || v.premium || v.owner || v.ownerr || v.rowner || v.group || v.mods)).map(v => v[x]).flat())
	}
	array = array.reduce((acc, e) => acc.concat(e), []).sort()
	let txt = `*Command Work in Private Chat :*\n\n⭔ Anonymous and Kerang Ajaib in *${usedPrefix}funmenu*\n⭔ All Commands in *${usedPrefix}genshinmenu*\n⭔ All Tools, check in *${usedPrefix}allmenu* at the bottom.\n`
	for (let x of array) {
		txt += '\n⭔ '+usedPrefix+x
	}
	await m.reply(txt)
}

handler.command = /^(priv(ate)?cmd)$/i

export default handler