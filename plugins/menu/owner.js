import db from '../../lib/database.js'
import { readMore, ranNumb, padLead } from '../../lib/func.js'
import { plugins } from '../../lib/plugins.js'
import { promises } from 'fs'
import { join } from 'path'
import fs from 'fs'

let tagsowner = {
	'owner': '🌸 *Owner*',
	'ownerr': '🌺 *Real Owner*',
	'mods': '💮 *DEV / MODS*',
}
const defaultMenu = {
	before: `
━ ━ *[ 🪷 OWNER BOT ONLY ]* ━ ━
`.trimStart(),
	header: '╭─「 %category 」',
	body: '│ • %cmd',
	footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
	try {
		let nais = 'https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/zero.jpg'
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let menuowner = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menuowner: Array.isArray(plugin.tagsowner) ? plugin.menuowner : [plugin.menuowner],
				tagsowner: Array.isArray(plugin.tagsowner) ? plugin.tagsowner : [plugin.tagsowner],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menuowner)
			if (plugin && 'tagsowner' in plugin)
				for (let tag of plugin.tagsowner)
					if (!(tag in tagsowner) && tag) tagsowner[tag] = tag
		conn.ownermenu = conn.ownermenu ? conn.ownermenu : {}
		let before = conn.ownermenu.before || defaultMenu.before
		let header = conn.ownermenu.header || defaultMenu.header
		let body = conn.ownermenu.body || defaultMenu.body
		let footer = conn.ownermenu.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tagsowner).map(tag => {
				return header.replace(/%category/g, tagsowner[tag]) + '\n' + [
					...menuowner.filter(ownermenu => ownermenu.tagsowner && ownermenu.tagsowner.includes(tag) && ownermenu.menuowner).map(ownermenu => {
						return ownermenu.menuowner.map(menuowner => {
							return body.replace(/%cmd/g, ownermenu.prefix ? menuowner : '%p' + menuowner)
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.ownermenu == 'string' ? conn.ownermenu : typeof conn.ownermenu == 'object' ? _text : ''
		let replace = {
			p: _p,
			'%': '%',
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		await conn.sendFThumb(m.chat, db.data.datas.maingroupname, text.replace(`addjoindurasi`, `addjoindurasi${readMore}`).trim(), nais, db.data.datas.linkgc, m)
	} catch (e) {
		console.log(e)
	}
}

handler.help = ['menuowner']
handler.tags = ['submenu']
handler.command = /^(r?(eal)?ownerm(enu)?|m(enu)?r?(eal)?owner)$/i

export default handler