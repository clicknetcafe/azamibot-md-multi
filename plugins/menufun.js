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

let tagsfun = {
	'rpg': '🎮 *RPG*',
	'game': '🎮 *GAMES*',
	'anonim': '🎩 *ANONYMOUS*',
	'kerang': '🐚 *KERANG AJAIB*',
}
const defaultMenu = {
	before: `
━ ━ *[ 🦠 FUN MENU ]* ━ ━
`.trimStart(),
	header: '╭─「 %category 」',
	body: '│ • %cmd',
	footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
	try {
		let nais = fs.readFileSync('./media/zero.jpg')
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let menufun = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menufun: Array.isArray(plugin.tagsfun) ? plugin.menufun : [plugin.menufun],
				tagsfun: Array.isArray(plugin.tagsfun) ? plugin.tagsfun : [plugin.tagsfun],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menufun)
			if (plugin && 'tagsfun' in plugin)
				for (let tag of plugin.tagsfun)
					if (!(tag in tagsfun) && tag) tagsfun[tag] = tag
		conn.funmenu = conn.funmenu ? conn.funmenu : {}
		let before = conn.funmenu.before || defaultMenu.before
		let header = conn.funmenu.header || defaultMenu.header
		let body = conn.funmenu.body || defaultMenu.body
		let footer = conn.funmenu.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tagsfun).map(tag => {
				return header.replace(/%category/g, tagsfun[tag]) + '\n' + [
					...menufun.filter(funmenu => funmenu.tagsfun && funmenu.tagsfun.includes(tag) && funmenu.menufun).map(funmenu => {
						return funmenu.menufun.map(menufun => {
							return body.replace(/%cmd/g, funmenu.prefix ? menufun : '%p' + menufun)
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.funmenu == 'string' ? conn.funmenu : typeof conn.funmenu == 'object' ? _text : ''
		let replace = {
			p: _p,
			'%': '%',
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		/*conn.sendHydrated(m.chat, text.replace(`build [item] [count]`, `build [item] [count]${readMore}`).trim(), packname + ' - ' + author, nais, 'https://cutt.ly/azamilaifuu', 'Minimalist ツ Sweet', null, null, [
			['Premium', '/premium'],
			['Speed', '/ping'],
			['Owner', '/owner']
		], m)*/
		conn.sendButton(m.chat, text.replace(`build [item] [count]`, `build [item] [count]${readMore}`).trim(), packname + ' - ' + author, nais, [
			[`👥 Owner`, `.owner`],
			[`🪡 Ping`, `.ping`]
		], m)
	} catch (e) {
		conn.reply(m.chat, 'Maaf, menufun sedang error', m)
		throw e
	}
}
handler.help = ['*menufun*']
handler.tags = ['submenu']
handler.command = /^((fun|rpg)m(enu)?|m(enu)?(fun|rpg))$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)