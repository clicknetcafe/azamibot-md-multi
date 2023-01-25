import db from '../lib/database.js'
import { plugins } from '../lib/plugins.js'
import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import { readMore, ranNumb, padLead, runtime } from '../lib/others.js'
import fs from 'fs'
import os from 'os'

let tagsm = {}
const defaultMenu = {
	before: `%name!

⦿ 🧱 Limit : *%limit Limit*
⦿ 🦸🏼‍♂️ Role : *%role*
⦿ 🔼 Level : *%level (%exp / %maxexp)*
⦿ 💵 Money : *%money*
⦿ 💫 Total XP : %totalexp ✨

⦿ 📊 Database : %totalreg User
⦿ 📈 Runtime : *%uptime*

_Claim *.daily* atau mainkan game di *.funmenu* untuk mendapatkan exp / money_
`.trimStart(),
	header: '╭─「 %category 」',
	body: '│ • %cmd %islimit %isPremium',
	footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, usedPrefix, command }) => {
	try {
		let jam = new Date().getHours()
		let meh = padLead(ranNumb(43), 3)
		//let meh2 = ranNumb(2)
		let meh2 = 2
		let nais = fs.readFileSync(`./media/picbot/menus/menus_${meh}.jpg`)
		let { exp, money, limit, level, role } = db.data.users[m.sender]
		let { min, xp, max } = xpRange(level, global.multiplier)
		let name = await conn.getName(m.sender).replaceAll('\n','')
		let uptime = runtime(process.uptime()).trim()
		let osarch = os.arch()
		let oscpu = os.cpus().slice(0,1).map(v => v.model.split('@')[0].replace(' CPU','').replace('Intel(R) ','').trim())
		let osspeed = os.cpus().slice(0,1).map(v => v.model.split('@')[1])
		let oscore = os.cpus().length
		let osversion = os.version().split(/single|datacenter/gi)[0].trim()
		let osrelease = os.release()
		let osuptime = runtime(os.uptime()).trim()
		let totalreg = Object.keys(db.data.users).length
		let helpm = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				helpm: Array.isArray(plugin.tagsm) ? plugin.helpm : [plugin.helpm],
				tagsm: Array.isArray(plugin.tagsm) ? plugin.tagsm : [plugin.tagsm],
				prefix: 'customPrefix' in plugin,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of helpm)
			if (plugin && 'tagsm' in plugin)
				for (let tag of plugin.tagsm)
					if (!(tag in tagsm) && tag) tagsm[tag] = tag
		conn.menu = conn.menu ? conn.menu : {}
		let before = conn.menu.before || defaultMenu.before
		let header = conn.menu.header || defaultMenu.header
		let body = conn.menu.body || defaultMenu.body
		let footer = conn.menu.footer || defaultMenu.footer
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`).replace(`%name!`, `${jam < 4 ? `*Hello %name!, 🌌 it's early in the morning*` : jam < 11 ? `*🌅 Good Morning %name!*` : jam < 14 ? `*☀️ Good Afternoon %name!*` : jam < 18 ? `*🌄 Good Evening %name!*` : `*Hello %name!, 🌖 Good Night*`}`),
			...Object.keys(tagsm).map(tag => {
				return header.replace(/%category/g, tagsm[tag]) + '\n' + [
					...helpm.filter(menu => menu.tagsm && menu.tagsm.includes(tag) && menu.helpm).map(menu => {
						return menu.helpm.map(helpm => {
							return body.replace(/%cmd/g, menu.prefix ? helpm : '%p' + helpm)
								.replace(/%islimit/g, menu.limit ? '(Limit)' : '')
								.replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
		let replace = {
			'%': '%',
			p: _p, uptime, osuptime, osarch, oscpu, osspeed, oscore, osrelease, osversion,
			me: conn.getName(conn.user.jid),
			exp: exp - min,
			money: money,
			maxexp: xp,
			totalexp: exp,
			xp4levelup: max - exp,
			level, limit, name, totalreg, role,
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		if (meh2 == 1) {
			conn.sendHydrated(m.chat, text.replaceAll('#','```').trim(), pauthor, nais, 'https://cutt.ly/azamilaifuu', 'Minimalist ツ Sweet', null, null, [
				['Premium', '.premium'],
				['Contact', '.owner'],
				['⦿ ALL MENU ⦿', '.menuall']
			], m)
		} else {
			if (!args[0]) {
				const sections = [
					{
						title: `━ ━ ━ ━ 『 MAIN 』 ━ ━ ━ ━`,
						rows: [
							{title: '⚡ PREMIUM', rowId: usedPrefix + 'sewa', description: 'Premium, Sewabot, Jadibot, Jasa Run Bot'},
							{title: '🎫 OWNER', rowId: usedPrefix + 'owner', description: 'Chat P tidak dibalas'},
							{title: '📁 Source Code', rowId: usedPrefix + 'sc', description: 'Original Base'}
						]
					}, {
						title: `━ ━ ━ ━ 『 SUB MENU 』 ━ ━ ━ ━`,
						rows: [
							{title: '🎪 ALL MENU', rowId: usedPrefix + 'menuall', description: '● Menampilkan Semua Menu'},
							{title: '🪙 STORE', rowId: usedPrefix + 'menustore', description: '🛒 Bot Store : List Items'},
							{title: '🪷 OWNER', rowId: usedPrefix + 'menuowner', description: '◉ Owner, ROwner, Mods Privilages'},
							{title: '🎎 ANIME', rowId: usedPrefix + 'menuanime', description: '◉ Cari Manga, Anime, Random Pic'},
							{title: '⌛ DOWNLOAD', rowId: usedPrefix + 'menudownload',  description: '◎ Youtube, Facebook, Tiktok, Dll...'},
							{title: '🎮 GAMES & FUN', rowId: usedPrefix + 'menufun', description: '⊛ RPG, Kuis, Anonymous'},
							{title: '🐳 GENSHIN IMPACT', rowId: usedPrefix + 'menugenshin', description: '⊜ genshin.dev API'},
							{title: '🔞 NSFW', rowId: usedPrefix + 'menunsfw', description: '◓ Fitur Afakah Ini ?'},
							{title: '👥 GROUP', rowId: usedPrefix + 'menugroup', description: '◒ Command Dalam Grup'},
							{title: '🗺 EDITOR', rowId: usedPrefix + 'menueditor',  description: 'ⓞ Kreasi Foto'},
							{title: '💫 EPHOTO 360', rowId: usedPrefix + 'menuephoto', description: '⦿ Edit Foto Kamu'},
							{title: '👼🏻 PHOTO OXY', rowId: usedPrefix + 'menuoxy', description: '◐ Edit Photos by Oxy'},
							{title: '🎨 TEXT PRO ME', rowId: usedPrefix + 'menutextpro', description: '◑ Kreasi Teks Efek'},
						]
					}, {
						title: `━ ━ ━ ━ 『 MISC 』 ━ ━ ━ ━`,
						rows: [
							{title: '🏓 PING', rowId: usedPrefix + 'ping'},
							{title: '🚄 SPEEDTEST', rowId: usedPrefix + 'speedtest'},
							{title: '🎎 DONASI', rowId: usedPrefix + 'donasi'},
						]
					}
				]
				const listMessage = {
					text: text.replaceAll('#','```').trim(),
					footer: pauthor,
					//title: '',
					buttonText: `SUB MENU 🎫`,
					sections
				}
				await conn.sendMessage(m.chat, listMessage, {quoted: ftrol})
			}
		}
	} catch (e) {
		throw e
	}
}

handler.command = /^((m(enu)?|help)(list)?|\?)$/i

export default handler