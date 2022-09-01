import { plugins } from '../lib/plugins.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let menu = Object.values(plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1)
	let menu2 = Object.values(plugins).filter(v => v.menuanime && !v.disabled).map(v => v.menuanime).flat(1)
	let menu3 = Object.values(plugins).filter(v => v.menudownload && !v.disabled).map(v => v.menudownload).flat(1)
	let menu4 = Object.values(plugins).filter(v => v.menuephoto && !v.disabled).map(v => v.menuephoto).flat(1)
	let menu5 = Object.values(plugins).filter(v => v.menueditor && !v.disabled).map(v => v.menueditor).flat(1)
	let menu6 = Object.values(plugins).filter(v => v.menufun && !v.disabled).map(v => v.menufun).flat(1)
	let menu7 = Object.values(plugins).filter(v => v.menugenshin && !v.disabled).map(v => v.menugenshin).flat(1)
	let menu8 = Object.values(plugins).filter(v => v.menugroup && !v.disabled).map(v => v.menugroup).flat(1)
	let menu9 = Object.values(plugins).filter(v => v.menunsfw && !v.disabled).map(v => v.menunsfw).flat(1)
	let menu10 = Object.values(plugins).filter(v => v.menuoxy && !v.disabled).map(v => v.menuoxy).flat(1)
	let menu11 = Object.values(plugins).filter(v => v.menutextpro && !v.disabled).map(v => v.menutextpro).flat(1)

	let txt = `*Total Fitur : ${menu.length + menu2.length + menu3.length + menu4.length + menu5.length + menu6.length + menu7.length + menu8.length + menu9.length + menu10.length + menu11.length}* Commands\n\n`
	txt += `*[ FRACTION LIST ]*\n\n`
	txt += `*⭔ Main Menu :* ${menu.length} fitur\n`
	txt += `*⭔ Anime :* ${menu2.length} fitur\n`
	txt += `*⭔ Download :* ${menu3.length} fitur\n`
	txt += `*⭔ Ephoto 360 :* ${menu4.length} fitur\n`
	txt += `*⭔ Editor :* ${menu5.length} fitur\n`
	txt += `*⭔ Fun & Games :* ${menu6.length} fitur\n`
	txt += `*⭔ Genshin :* ${menu7.length} fitur\n`
	txt += `*⭔ Group :* ${menu8.length} fitur\n`
	txt += `*⭔ NSFW :* ${menu9.length} fitur\n`
	txt += `*⭔ Photo Oxy :* ${menu10.length} fitur\n`
	txt += `*⭔ Text Pro Me :* ${menu11.length} fitur`
	await m.reply(txt)
}

handler.help = ['totalfitur']
handler.tags = ['tools']
handler.command = /^(ft|total(ft?|fitur|cmd|command))$/i

export default handler