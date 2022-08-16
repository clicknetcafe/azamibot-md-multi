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

let tagsgenshin = {
	'search': 'Genshin Data',
}
const defaultMenu = {
	before: `
Genshin Impact JSON data with a robust searching API! Updated to version 2.8. Sources from the fandom wiki and GenshinData repo.

━ ━ *[ 🐳 GENSHIN COMMAND ]* ━ ━
`.trimStart(),
	header: '╭─「 %category 」',
	body: '│ • %cmd',
	footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
	try {
		let meh = padLead(ranNumb(39), 3)
		let nais = fs.readFileSync(`./media/picbot/genshin/genshin_${meh}.jpg`)
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let menugenshin = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menugenshin: Array.isArray(plugin.tagsgenshin) ? plugin.menugenshin : [plugin.menugenshin],
				tagsgenshin: Array.isArray(plugin.tagsgenshin) ? plugin.tagsgenshin : [plugin.tagsgenshin],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menugenshin)
			if (plugin && 'tagsgenshin' in plugin)
				for (let tag of plugin.tagsgenshin)
					if (!(tag in tagsgenshin) && tag) tagsgenshin[tag] = tag
		conn.genshinmenu = conn.genshinmenu ? conn.genshinmenu : {}
		let before = conn.genshinmenu.before || defaultMenu.before
		let header = conn.genshinmenu.header || defaultMenu.header
		let body = conn.genshinmenu.body || defaultMenu.body
		let footer = conn.genshinmenu.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tagsgenshin).map(tag => {
				return header.replace(/%category/g, tagsgenshin[tag]) + '\n' + [
					...menugenshin.filter(genshinmenu => genshinmenu.tagsgenshin && genshinmenu.tagsgenshin.includes(tag) && genshinmenu.menugenshin).map(genshinmenu => {
						return genshinmenu.menugenshin.map(menugenshin => {
							return body.replace(/%cmd/g, genshinmenu.prefix ? menugenshin : '%p' + menugenshin)
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.genshinmenu == 'string' ? conn.genshinmenu : typeof conn.genshinmenu == 'object' ? _text : ''
		let replace = {
			p: _p,
			'%': '%',
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		/*conn.sendHydrated(m.chat, text.replace(`si <character>`, `si <character>${readMore}`).trim(), packname + ' - ' + author, nais, 'https://cutt.ly/azamilaifuu', 'Minimalist ツ Sweet', null, null, [
			['Premium', '/premium'],
			['Speed', '/ping'],
			['Owner', '/owner']
		], m)*/
		conn.sendButton(m.chat, text.replace(`si <character>`, `si <character>${readMore}`).trim(), packname + ' - ' + author, nais, [
			[`👥 Owner`, `.owner`],
			[`🪡 Ping`, `.ping`]
		], m)
	} catch (e) {
		conn.reply(m.chat, 'Maaf, menugenshin sedang error', m)
		throw e
	}
}
handler.help = ['menugenshin']
handler.tags = ['submenu']
handler.command = /^(genshinm(enu)?|m(enu)?genshin)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)