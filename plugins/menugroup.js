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

let tagsgroup = {
	'group': 'Some Admin Privilages',
	'owner': '*Owner Bot Only*',
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
		let nais = fs.readFileSync('./media/zero.jpg')
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
		/*conn.sendHydrated(m.chat, text.replace(`demote @tag`, `demote @tag${readMore}`).trim(), packname + ' - ' + author, nais, 'https://cutt.ly/azamilaifuu', 'Minimalist ツ Sweet', null, null, [
			['Premium', '/premium'],
			['Speed', '/ping'],
			['Owner', '/owner']
		], m)*/
		conn.sendButton(m.chat, text.replace(`demote @tag`, `demote @tag${readMore}`).trim(), packname + ' - ' + author, nais, [
			[`👥 Owner`, `.owner`],
			[`🪡 Ping`, `.ping`]
		], m)
	} catch (e) {
		conn.reply(m.chat, 'Maaf, menugroup sedang error', m)
		throw e
	}
}
handler.help = ['menugroup']
handler.tags = ['submenu']
handler.command = /^(gro?upm(enu)?|m(enu)?gro?up)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)