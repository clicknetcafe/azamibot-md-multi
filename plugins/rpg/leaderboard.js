import { isNumber } from '../../lib/func.js'
import { areJidsSameUser } from '@whiskeysockets/baileys'
import db from '../../lib/database.js'

const leaderboards = [
  'level',
  'exp',
  'limit',
  'money',
  'iron',
  'gold',
  'diamond',
  'emerald',
  'trash',
  'potion',
  'petFood',
  'wood',
  'rock',
  'string',
  'common',
  'uncommon',
  'mythic',
  'legendary',
  'pet'
]
let handler = async (m, { conn, args, participants, usedPrefix, command }) => {
  let users = Object.entries(db.data.users).map(([key, value]) => {
	return { ...value, jid: key }
  })
  let leaderboard = leaderboards.filter(v => v && !v.includes('@g.us') && users.filter(user => user && user[v]).length)
  let type = (args[0] || '').toLowerCase()
  const getPage = (item) => Math.ceil((users.filter(async user => await user && user[item]).length) / 25)
  let wrong = `
Use format *${usedPrefix}${command} [type] [page]*
example *${usedPrefix}${command} money 1*

📍 Type list
${leaderboard.map(v => `
${rpg.emoticon(v)}${v}
`.trim()).join('\n')}
`.trim()
  if (!leaderboard.includes(type)) return m.reply(wrong)
  let prems = db.data.datas.prems
  let page = isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 0), getPage(type)) : 0
  let sortedItem = users.map(toNumber(type)).sort(sort(type))
  let userItem = sortedItem.map(enumGetKey)
  // let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 5)) : Math.min(5, sortedExp.length)
  let text = `
• *${rpg.emoticon(type)}${type} Leaderboard page ${page} of ${getPage(type)}* •
You: *${userItem.indexOf(m.sender) + 1}* of *${userItem.length}*

${await sortedItem.slice(page * 25, page * 25 + 25).map((user, i) => `*[${i + 1}]* ${participants.some(p => areJidsSameUser(user.jid, p.id)) ? `(${conn.getName(user.jid).replaceAll('\n',' ')}) wa.me/` : '@'}${user.jid.split`@`[0]}\n┗⊱ *${type == 'limit' && prems.some(sub=>user.jid.split`@`[0].includes(sub)) ? '~ Infinity ~' : user[type]} ${rpg.emoticon(type)}${type}*`).join`\n`}
`.trim()
  await m.reply(text, null, {
	mentions: [...userItem.slice(page * 25, page * 25 + 25)].filter(v => !participants.some(p => areJidsSameUser(v, p.id)))
  })
}

handler.menufun = ['leaderboard [jumlah user]', 'lb [jumlah user]']
handler.tagsfun = ['rpg']
handler.command = /^(leaderboard|lb)$/i

export default handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
	return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
  return a.jid
}