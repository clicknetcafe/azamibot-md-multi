import { areJidsSameUser } from '@adiwajshing/baileys'

let handler = async (m, { conn, args }) => {
	let group = m.chat
	if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) group = args[0]
	if (!/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(group)) throw 'Hanya bisa dibuka di grup'
	let groupMetadata = await conn.groupMetadata(group)
	if (!groupMetadata) throw 'groupMetadata is undefined :\\'
	if (!('participants' in groupMetadata)) throw 'participants is not defined :('
	let me = groupMetadata.participants.find(user => areJidsSameUser(user.id, conn.user.id))
	if (!me) throw 'Aku tidak ada di grup itu :('
	if (!me.admin) throw 'Aku bukan admin T_T'
	/*conn.sendMessage(m.chat, {
		text: `[ LINK GROUP ]\n\nhttps://chat.whatsapp.com/${await conn.groupInviteCode(group)}`,
		templateButtons: [{
			index: 1,
			urlButton: {
				displayText: `Salin Link`,
				url: 'https://www.whatsapp.com/otp/copy/https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)
			}
		}],
		footer: pauthor
	})*/
	m.reply('[ LINK GROUP ]\n\nhttps://chat.whatsapp.com/' + await conn.groupInviteCode(group))
}

handler.menugroup = ['linkgroup']
handler.tagsgroup = ['group']
handler.command = /^(link(gc|gro?up)|(gc|gro?up)link)$/i

handler.botAdmin = true
handler.group = true

export default handler