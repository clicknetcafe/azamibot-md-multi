import db from '../../lib/database.js'
import { readMore, ranNumb, padLead } from '../../lib/func.js'
import { plugins } from '../../lib/plugins.js'
import { promises } from 'fs'
import { join } from 'path'
import fs from 'fs'

let tagseditor = {
	'search': 'Photo Effects',
	'filter': 'Photo Filters'
}
const defaultMenu = {
	before: `
━ ━ *[ 🗺 EDIT GAMBAR ]* ━ ━
`.trimStart(),
	header: '╭─「 %category 」',
	body: '│ • %cmd',
	footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
	try {
		let nais = 'https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/editor.jpg'
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let menueditor = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menueditor: Array.isArray(plugin.tagseditor) ? plugin.menueditor : [plugin.menueditor],
				tagseditor: Array.isArray(plugin.tagseditor) ? plugin.tagseditor : [plugin.tagseditor],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menueditor)
			if (plugin && 'tagseditor' in plugin)
				for (let tag of plugin.tagseditor)
					if (!(tag in tagseditor) && tag) tagseditor[tag] = tag
		conn.editormenu = conn.editormenu ? conn.editormenu : {}
		let before = conn.editormenu.before || defaultMenu.before
		let header = conn.editormenu.header || defaultMenu.header
		let body = conn.editormenu.body || defaultMenu.body
		let footer = conn.editormenu.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tagseditor).map(tag => {
				return header.replace(/%category/g, tagseditor[tag]) + '\n' + [
					...menueditor.filter(editormenu => editormenu.tagseditor && editormenu.tagseditor.includes(tag) && editormenu.menueditor).map(editormenu => {
						return editormenu.menueditor.map(menueditor => {
							return body.replace(/%cmd/g, editormenu.prefix ? menueditor : '%p' + menueditor)
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.editormenu == 'string' ? conn.editormenu : typeof conn.editormenu == 'object' ? _text : ''
		let replace = {
			p: _p,
			'%': '%',
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		await conn.sendFThumb(m.chat, db.data.datas.maingroupname, text.replace(`skullmask`, `skullmask${readMore}`).trim(), nais, db.data.datas.linkgc, m)
	} catch (e) {
		console.log(e)
	}
}

handler.help = ['menueditor']
handler.tags = ['submenu']
handler.command = /^(editorm(enu)?|m(enu)?editor)$/i

export default handler