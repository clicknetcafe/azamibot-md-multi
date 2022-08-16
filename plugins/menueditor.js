import { plugins } from '../lib/plugins.js'
import { promises } from 'fs'
import { join } from 'path'
import fs from 'fs'

function ranNumb(min, max = null) {
	if (max !== null) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} else {
		return Math.floor(Math.random() * min) + 1
	}
}

function padLead(num, size) {
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}

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
		let nais = fs.readFileSync('./media/editor.jpg')
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
		/*conn.sendHydrated(m.chat, text.replace(`skullmask`, `skullmask${readMore}`).trim(), packname + ' - ' + author, nais, 'https://cutt.ly/azamilaifuu', 'Minimalist ツ Sweet', null, null, [
			['Premium', '/premium'],
			['Speed', '/ping'],
			['Owner', '/owner']
		], m)*/
		conn.sendButton(m.chat, text.replace(`skullmask`, `skullmask${readMore}`).trim(), packname + ' - ' + author, nais, [
			[`👥 Owner`, `.owner`],
			[`🪡 Ping`, `.ping`]
		], m)
	} catch (e) {
		conn.reply(m.chat, 'Maaf, menueditor sedang error', m)
		throw e
	}
}
handler.help = ['menueditor']
handler.tags = ['submenu']
handler.command = /^(editorm(enu)?|m(enu)?editor)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)