import db from '../../lib/database.js'
import { readMore, ranNumb, padLead } from '../../lib/func.js'
import { plugins } from '../../lib/plugins.js'
import { promises } from 'fs'
import { join } from 'path'
import fs from 'fs'

let tagstextpro = {
	'offi': 'textpro.me Official',
	'search': 'Make Text Effect',
}
const defaultMenu = {
	before: `
━ ━ *[ 🎨 Text Pro Me ]* ━ ━
`.trimStart(),
	header: '╭─「 %category 」',
	body: '│ • %cmd',
	footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
	try {
		let nais = 'https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/textpro.jpg'
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let menutextpro = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menutextpro: Array.isArray(plugin.tagstextpro) ? plugin.menutextpro : [plugin.menutextpro],
				tagstextpro: Array.isArray(plugin.tagstextpro) ? plugin.tagstextpro : [plugin.tagstextpro],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menutextpro)
			if (plugin && 'tagstextpro' in plugin)
				for (let tag of plugin.tagstextpro)
					if (!(tag in tagstextpro) && tag) tagstextpro[tag] = tag
		conn.textpromenu = conn.textpromenu ? conn.textpromenu : {}
		let before = conn.textpromenu.before || defaultMenu.before
		let header = conn.textpromenu.header || defaultMenu.header
		let body = conn.textpromenu.body || defaultMenu.body
		let footer = conn.textpromenu.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tagstextpro).map(tag => {
				return header.replace(/%category/g, tagstextpro[tag]) + '\n' + [
					...menutextpro.filter(textpromenu => textpromenu.tagstextpro && textpromenu.tagstextpro.includes(tag) && textpromenu.menutextpro).map(textpromenu => {
						return textpromenu.menutextpro.map(menutextpro => {
							return body.replace(/%cmd/g, textpromenu.prefix ? menutextpro : '%p' + menutextpro)
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.textpromenu == 'string' ? conn.textpromenu : typeof conn.textpromenu == 'object' ? _text : ''
		let replace = {
			p: _p,
			'%': '%',
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		await conn.sendFThumb(m.chat, db.data.datas.maingroupname, text.replace(`summer <text>`, `summer <text>${readMore}`).trim(), nais, db.data.datas.linkgc, m)
	} catch (e) {
		console.log(e)
	}
}

handler.help = ['menutextpro']
handler.tags = ['submenu']
handler.command = /^(textprom(enu)?|m(enu)?textpro)$/i

export default handler