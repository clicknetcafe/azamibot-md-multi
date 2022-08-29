import pkg from '@adiwajshing/baileys';
const { WA_DEFAULT_EPHEMERAL, groupToggleEphemeral } = pkg;

String.prototype.includesOneOf = function(arrayOfStrings) {
	if(!Array.isArray(arrayOfStrings)) {
	throw new Error('includesOneOf only accepts an array')
	}
	return arrayOfStrings.some(str => this.toLowerCase().startsWith(str))
}

let handler = async (m, { conn, text, usedPrefix, isAdmin, isOwner, command }) => {
	let txt = `Usage : *${usedPrefix + command} <options>*\n\nExample : *${usedPrefix + command} 1d*\n\n*[ List Options ]*\n⭔ *on* ( WA Deafult )\n⭔ *off* ( disable )\n⭔ *1d* ( 1 hari )\n⭔ *7d* ( 7 hari )\n⭔ *90d* ( 90 hari )`
	//if (!text) throw txt
	text = text.toLowerCase()
	let n
	if (isAdmin || isOwner) {
		try {
			if (!text) {
				conn.groupToggleEphemeral(m.chat, WA_DEFAULT_EPHEMERAL)
				n = `nyalakan.`
			} else if (text.includesOneOf(['1','1d','1h','24'])) {
				conn.groupToggleEphemeral(m.chat, 86400)
				n = `24 jam.`
			} else if (text.includesOneOf(['7','7d','7h'])) {
				conn.groupToggleEphemeral(m.chat, 604800)
				n = `7 hari.`
			} else if (text.includesOneOf(['90','90d','90h','3'])) {
				conn.groupToggleEphemeral(m.chat, 7776000)
				n = `90 hari.`
			} else if (text.includesOneOf(['off','mati','disable','false'])) {
				conn.groupToggleEphemeral(m.chat, 0)
				n = `matikan.`
			} else if (text.includesOneOf(['nyala','on','enable','true'])) {
				conn.groupToggleEphemeral(m.chat, WA_DEFAULT_EPHEMERAL)
				n = `nyalakan.`
			} else {
				n = txt
			}
			m.reply(n.includes('⭔ *off*') ? txt : `*ephemeral* berhasil di ${n.includes('nya') ? `*${n}*` : n.includes('mat') ? `*${n}*` : `set untuk *${n}*`}`)
		} catch (e) {
			console.log(e)
		}
	} else {
		m.reply(`*「ADMIN GROUP ONLY」*`)
	}
}

handler.menugroup = ['setppgc']
handler.tagsgroup = ['group']
handler.command = /^((set)?ep(hem(eral)?)?|psgc|gcps|(ps|pesan)?sementara)$/i

handler.botAdmin = true
handler.group = true

export default handler