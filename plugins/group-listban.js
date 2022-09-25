import db from '../lib/database.js'

let handler = async (m, { conn, isOwner }) => {
	let chats = Object.entries(db.data.chats).filter(chat => chat[1].isBanned)
	let users = Object.entries(db.data.users).filter(user => user[1].banned && !(user[0].startsWith('212') || user[0].startsWith('265')))
	let users2 = Object.entries(db.data.users).filter(user => user[1].banned)
	let listgc = [], z = 0, txt = ''
	let groups = Object.values(await conn.groupFetchAllParticipating())
	for (let i = 0; i < groups.length; i++) {
		if (db.data.chats[groups[i].id].isBanned) {
			listgc.push(groups[i].id)
			txt += `├ *[${z + 1}]* ${await conn.getName(groups[i].id)}\n`
			txt += `├ ┗⊱ ${groups[i].id}\n`
			z += 1
		}
	}
	for (let x of Object.keys(chats)) {
		if (!listgc.includes(chats[x][0])) {
			listgc.push(chats[x][0])
			txt += `├ *[${z + 1}]* Unknown ( Bot Leave )\n`
			txt += `├ ┗⊱ ${chats[x][0]}\n`
			z += 1
		}
	}
	let caption = `${chats.length == 0 ? `` : `
┌〔 List Banned Group 〕
├ Total : *${chats.length} Group*
${txt}└────

`}${users.length == 0 ? `` : `┌〔 List Banned User 〕
├ *${users2.length} User* (+212 & +265 Auto Banned)${users ? '\n' + users.map(([jid], i) => `
├ *[${i + 1}]* ( ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid).replaceAll('\n','')} )
├ ┗⊱ ${isOwner ? 'wa.me/' + jid.split`@`[0] : jid}
`.trim()).join('\n') : ''}
└────

`}
`.trim()
	await m.reply(caption)
}

handler.menugroup = ['bannedlist']
handler.tagsgroup = ['group']
handler.command = /^(list(ban(ned)?|bloc?k)|(ban(ned)?|bloc?k)list|daftar(ban(ned)?|bloc?k))$/i

export default handler