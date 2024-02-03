import db from '../../lib/database.js'
import { readMore, ranNumb, padLead } from '../../lib/func.js'
import { plugins } from '../../lib/plugins.js'
import { promises } from 'fs'
import { join } from 'path'
import fs from 'fs'

let tagsgroup = {
	'group': '*Some Admin Privilages*'
}
const defaultMenu = {
	before: `
━ ━ *[ 👥 GROUP FEATURE ]* ━ ━
`.trimStart(),
	header: '╭─「 %category 」',
	body: '│ • %cmd',
	footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
	try {
		let nais = 'https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/zero.jpg'
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let menugroup = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menugroup: Array.isArray(plugin.tagsgroup) ? plugin.menugroup : [plugin.menugroup],
				tagsgroup: Array.isArray(plugin.tagsgroup) ? plugin.tagsgroup : [plugin.tagsgroup],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menugroup)
			if (plugin && 'tagsgroup' in plugin)
				for (let tag of plugin.tagsgroup)
					if (!(tag in tagsgroup) && tag) tagsgroup[tag] = tag
		conn.groupmenu = conn.groupmenu ? conn.groupmenu : {}
		let before = conn.groupmenu.before || defaultMenu.before
		let header = conn.groupmenu.header || defaultMenu.header
		let body = conn.groupmenu.body || defaultMenu.body
		let footer = conn.groupmenu.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tagsgroup).map(tag => {
				return header.replace(/%category/g, tagsgroup[tag]) + '\n' + [
					...menugroup.filter(groupmenu => groupmenu.tagsgroup && groupmenu.tagsgroup.includes(tag) && groupmenu.menugroup).map(groupmenu => {
						return groupmenu.menugroup.map(menugroup => {
							return body.replace(/%cmd/g, groupmenu.prefix ? menugroup : '%p' + menugroup)
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.groupmenu == 'string' ? conn.groupmenu : typeof conn.groupmenu == 'object' ? _text : ''
		let replace = {
			p: _p,
			'%': '%',
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		await conn.sendFThumb(m.chat, db.data.datas.maingroupname, text.replace(`demote @tag`, `demote @tag${readMore}`).trim(), nais, db.data.datas.linkgc, m)
	} catch (e) {
		console.log(e)
	}
}

handler.help = ['menugroup']
handler.tags = ['submenu']
handler.command = /^(gro?upm(enu)?|m(enu)?gro?up)$/i

export default handler