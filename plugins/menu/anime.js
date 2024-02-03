import db from '../../lib/database.js'
import { readMore, ranNumb, padLead } from '../../lib/func.js'
import { plugins } from '../../lib/plugins.js'
import { promises } from 'fs'
import { join } from 'path'

let tagsanime = {
	'search': '🚀 *SEARCH*',
	'randompic': '✨ *RANDOM PIC*',
	'randommp4': '✨ *RANDOM MP4*',
}
const defaultMenu = {
	before: `
━ ━ *[ 🎎 ANIME STUFF ]* ━ ━
`.trimStart(),
	header: '╭─「 %category 」',
	body: '│ • %cmd',
	footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = `https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/picbot/menus/menus_${meh}.jpg`
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let menuanime = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menuanime: Array.isArray(plugin.tagsanime) ? plugin.menuanime : [plugin.menuanime],
				tagsanime: Array.isArray(plugin.tagsanime) ? plugin.tagsanime : [plugin.tagsanime],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menuanime)
			if (plugin && 'tagsanime' in plugin)
				for (let tag of plugin.tagsanime)
					if (!(tag in tagsanime) && tag) tagsanime[tag] = tag
		conn.animemenu = conn.animemenu ? conn.animemenu : {}
		let before = conn.animemenu.before || defaultMenu.before
		let header = conn.animemenu.header || defaultMenu.header
		let body = conn.animemenu.body || defaultMenu.body
		let footer = conn.animemenu.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tagsanime).map(tag => {
				return header.replace(/%category/g, tagsanime[tag]) + '\n' + [
					...menuanime.filter(animemenu => animemenu.tagsanime && animemenu.tagsanime.includes(tag) && animemenu.menuanime).map(animemenu => {
						return animemenu.menuanime.map(menuanime => {
							return body.replace(/%cmd/g, animemenu.prefix ? menuanime : '%p' + menuanime)
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.animemenu == 'string' ? conn.animemenu : typeof conn.animemenu == 'object' ? _text : ''
		let replace = {
			p: _p,
			'%': '%',
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		await conn.sendFThumb(m.chat, db.data.datas.maingroupname, text.replace(`PIC* 」`, `PIC* 」${readMore}`).trim(), nais, db.data.datas.linkgc, m)
	} catch (e) {
		console.log(e)
	}
}

handler.help = ['*menuanime*']
handler.tags = ['submenu']
handler.command = /^(animem(enu)?|m(enu)?anime)$/i

export default handler