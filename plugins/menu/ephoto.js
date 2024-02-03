import db from '../../lib/database.js'
import { readMore, ranNumb, padLead } from '../../lib/func.js'
import { plugins } from '../../lib/plugins.js'
import { promises } from 'fs'
import { join } from 'path'
import fs from 'fs'

let tagsephoto = {
	'search': 'Photo Effects',
}
const defaultMenu = {
	before: `
━ ━ *[ 💫 Ephoto 360 ]* ━ ━
`.trimStart(),
	header: '╭─「 %category 」',
	body: '│ • %cmd',
	footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
	try {
		let nais = 'https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/ephoto.jpg'
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let menuephoto = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menuephoto: Array.isArray(plugin.tagsephoto) ? plugin.menuephoto : [plugin.menuephoto],
				tagsephoto: Array.isArray(plugin.tagsephoto) ? plugin.tagsephoto : [plugin.tagsephoto],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menuephoto)
			if (plugin && 'tagsephoto' in plugin)
				for (let tag of plugin.tagsephoto)
					if (!(tag in tagsephoto) && tag) tagsephoto[tag] = tag
		conn.ephotomenu = conn.ephotomenu ? conn.ephotomenu : {}
		let before = conn.ephotomenu.before || defaultMenu.before
		let header = conn.ephotomenu.header || defaultMenu.header
		let body = conn.ephotomenu.body || defaultMenu.body
		let footer = conn.ephotomenu.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tagsephoto).map(tag => {
				return header.replace(/%category/g, tagsephoto[tag]) + '\n' + [
					...menuephoto.filter(ephotomenu => ephotomenu.tagsephoto && ephotomenu.tagsephoto.includes(tag) && ephotomenu.menuephoto).map(ephotomenu => {
						return ephotomenu.menuephoto.map(menuephoto => {
							return body.replace(/%cmd/g, ephotomenu.prefix ? menuephoto : '%p' + menuephoto)
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.ephotomenu == 'string' ? conn.ephotomenu : typeof conn.ephotomenu == 'object' ? _text : ''
		let replace = {
			p: _p,
			'%': '%',
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		await conn.sendFThumb(m.chat, db.data.datas.maingroupname, text.replace(`flower <text>`, `flower <text>${readMore}`).trim(), nais, db.data.datas.linkgc, m)
	} catch (e) {
		console.log(e)
	}
}

handler.help = ['menuephoto']
handler.tags = ['submenu']
handler.command = /^(ephotom(enu)?|m(enu)?ephoto)$/i

export default handler