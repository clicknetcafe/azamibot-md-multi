import db from '../../lib/database.js'
import { readMore, ranNumb, padLead } from '../../lib/func.js'
import { plugins } from '../../lib/plugins.js'
import { promises } from 'fs'
import { join } from 'path'
import fs from 'fs'

let tagsoxy = {
	'search': 'Make Photo Effect',
}
const defaultMenu = {
	before: `
━ ━ *[ 👼🏻 Photo Oxy ]* ━ ━
`.trimStart(),
	header: '╭─「 %category 」',
	body: '│ • %cmd',
	footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
	try {
		let nais = 'https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/oxy.jpg'
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let menuoxy = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menuoxy: Array.isArray(plugin.tagsoxy) ? plugin.menuoxy : [plugin.menuoxy],
				tagsoxy: Array.isArray(plugin.tagsoxy) ? plugin.tagsoxy : [plugin.tagsoxy],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menuoxy)
			if (plugin && 'tagsoxy' in plugin)
				for (let tag of plugin.tagsoxy)
					if (!(tag in tagsoxy) && tag) tagsoxy[tag] = tag
		conn.oxymenu = conn.oxymenu ? conn.oxymenu : {}
		let before = conn.oxymenu.before || defaultMenu.before
		let header = conn.oxymenu.header || defaultMenu.header
		let body = conn.oxymenu.body || defaultMenu.body
		let footer = conn.oxymenu.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tagsoxy).map(tag => {
				return header.replace(/%category/g, tagsoxy[tag]) + '\n' + [
					...menuoxy.filter(oxymenu => oxymenu.tagsoxy && oxymenu.tagsoxy.includes(tag) && oxymenu.menuoxy).map(oxymenu => {
						return oxymenu.menuoxy.map(menuoxy => {
							return body.replace(/%cmd/g, oxymenu.prefix ? menuoxy : '%p' + menuoxy)
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.oxymenu == 'string' ? conn.oxymenu : typeof conn.oxymenu == 'object' ? _text : ''
		let replace = {
			p: _p,
			'%': '%',
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		await conn.sendFThumb(m.chat, db.data.datas.maingroupname, text.replace(`message <text>`, `message <text>${readMore}`).trim(), nais, db.data.datas.linkgc, m)
	} catch (e) {
		console.log(e)
	}
}

handler.help = ['menuoxy']
handler.tags = ['submenu']
handler.command = /^(oxym(enu)?|m(enu)?oxy)$/i

export default handler