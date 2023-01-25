import db from '../lib/database.js'
import pkg from '@adiwajshing/baileys';
const { WA_DEFAULT_EPHEMERAL, groupToggleEphemeral } = pkg;

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isBotAdmin, isAdmin, isROwner }) => {
	let isEnable = /true|enable|(turn)?on|1/i.test(command)
	let chat = db.data.chats[m.chat]
	let user = db.data.users[m.sender]
	let datas = db.data.datas
	let bot = db.data.settings[conn.user.jid] || {}
	let type = (args[0] || '').toLowerCase()
	let isAll = false, isUser = false
	switch (type) {
		case 'welcome':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.welcome = isEnable
			break
		case 'delete':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.delete = isEnable
			break
		case 'antidelete':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.delete = !isEnable
			break
		case 'nsfw':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.nsfw = isEnable
			break
		case 'game':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.game = isEnable
			break
		case 'antilink':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.antiLink = isEnable
			break
		case 'antivirus':
		case 'antivirtex':
		case 'antivirtext':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.antivirus = isEnable
			break
		case 'antiviewonce':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.viewonce = isEnable
			break
		case 'infogempa':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.infogempa = isEnable
			break
		case 'simi':
		case 'simsimi':
			if (chat.simi && isEnable) throw `[!] Mode simi masih aktif Kak!`
			if (chat.lastsimi && isEnable) throw `[!] Durasi simi masih cooldown!`
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.simi = isEnable
			if (isEnable) {
				chat.lastsimi = isEnable
				setTimeout(() => {
					chat.simi = !isEnable
					chat.lastsimi = !isEnable
				}, 299000)
				setTimeout(() => {
					chat.simi = !isEnable
					chat.lastsimi = !isEnable
					conn.sendMessage(m.chat, { text: `Simi *OFF* Kak` }, { quoted: fkontak })
				}, 300000)
			}
			break
		case 'openai':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.openai = isEnable
			break
		case 'openaipc':
		case 'openaipm':
		case 'openaiprivat':
		case 'openaiprivate':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			datas.openaipc = isEnable
			break
		case 'public':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['self'] = !isEnable
			break
		case 'self':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['self'] = isEnable
			break
		case 'restrict':
			isAll = true
			if (!isOwner) {
				global.dfail('owner', m, conn)
				throw false
			}
			bot.restrict = isEnable
			break
		case 'autoread':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['autoread'] = isEnable
			break
		case 'pconly':
		case 'privateonly':
			if (isEnable && global.opts['gconly']) throw `[!] Matikan dulu *gconly !*`
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['pconly'] = isEnable
			break
		case 'gconly':
		case 'grouponly':
			if (isEnable && global.opts['pconly']) throw `[!] Matikan dulu *pconly !*`
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['gconly'] = isEnable
			break
		case 'ep':
		case 'ephem':
		case 'ephemeral':
		case 'psgc':
			if ((isAdmin || isOwner) && isBotAdmin) {
				if (isEnable) {
					conn.groupToggleEphemeral(m.chat, WA_DEFAULT_EPHEMERAL)
				} else {
					conn.groupToggleEphemeral(m.chat, 0)
				}
			} else {
				m.reply(isBotAdmin ? `*「ADMIN GROUP ONLY」*` : `*「BOT HARUS JADI ADMIN」*`)
			}
			break
		default:
			if (!/[01]/.test(command)) return m.reply(`*List option :*\n| welcome | delete | antidelete | ephemeral | nsfw | game | antilink | antivirtex | antiviewonce | infogempa | simsimi | openai | openaipc | public | self | restrict | autoread | pconly | gconly |

Example :
*${usedPrefix + command} welcome*
*${usedPrefix + command} welcome*
`.trim())
			throw false
	}
	await conn.sendMessage(m.chat, { text: `
*${type}* berhasil di *${isEnable ? 'nyala' : 'mati'}kan* ${isAll ? 'untuk bot ini' : isUser ? '' : 'untuk chat ini'}${(type.includes('simi') && isEnable) ? '\n\nAuto OFF dalam *5 menit* ( menghindari spam )' : ''}
`.trim() }, { quoted: fkontak })
}

handler.menugroup = ['en', 'dis'].map(v => v + 'able <option>')
handler.tagsgroup = ['group']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

export default handler