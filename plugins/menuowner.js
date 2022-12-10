import { readMore, ranNumb, padLead } from '../lib/others.js'
import { plugins } from '../lib/plugins.js'
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
		let nais = fs.readFileSync('./media/zero.jpg')
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
		/*conn.sendHydrated(m.chat, text.replace(`demote @tag`, `demote @tag${readMore}`).trim(), packname + ' - ' + author, nais, 'https://cutt.ly/azamilaifuu', 'Minimalist ツ Sweet', null, null, [
			['Premium', '/premium'],
			['Speed', '/ping'],
			['Owner', '/owner']
		], m)*/
		conn.sendButton(m.chat, text, packname + ' - ' + author, nais, [
			[`👥 Owner`, `.owner`],
			[`🪡 Ping`, `.ping`]
		], m)
	} catch (e) {
		conn.reply(m.chat, 'Maaf, menuowner sedang error', m)
		throw e
	}
}
handler.help = ['menuowner']
handler.tags = ['submenu']
handler.command = /^(r?(eal)?ownerm(enu)?|m(enu)?r?(eal)?owner)$/i

export default handler