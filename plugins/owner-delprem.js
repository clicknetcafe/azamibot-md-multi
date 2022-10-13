import fs from 'fs'

let handler = async (m, { conn, text }) => {
	let who
	if (m.isGroup) {
		who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text : ''
	} else {
		who = m.quoted ? m.quoted.sender : text ? text : m.chat ? m.chat : ''
	}
	if (!who) return m.reply(`tag orangnya!`)
	let prems = global.prems
	if (!prems.includes(who.split`@`[0])) throw 'dia ngga premium!'
	let beforejoin = `'${prems.toString().replaceAll(',',`','`)}'`
	let handler = await fs.readFileSync(`./handler.js`, 'utf8')
	let index = prems.findIndex(v => (v.replace(/[^0-9]/g, '') + '@s.whatsapp.net') === (who.replace(/[^0-9]/g, '') + '@s.whatsapp.net'))
	prems.splice(index, 1)
	let afterjoin = prems.length == 0 ? '' : `'${prems.toString().replaceAll(',',`','`)}'`
	await fs.writeFileSync(`./handler.js`, handler.replace(`global.prems = [${beforejoin}]`,`global.prems = [${afterjoin}]`))
	m.reply(`@${(who || '').replace(/@s\.whatsapp\.net/g, '')} sekarang bukan premium!.`, null, { mentions: [who] })
}

handler.mengroup = ['delprem <@tag>']
handler.tagsgroup = ['owner']
handler.command = /^(delprem(ium)?)$/i

handler.owner = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))