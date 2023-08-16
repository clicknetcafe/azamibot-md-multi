import { somematch } from '../../lib/func.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	let x = args[0], y = args[1]
	if (!somematch(['lastseen', 'online', 'disappearmode', 'profilepic', 'status', 'readreceipt', 'groupinvite'], x)) throw `*Privasi yang dapat diatur :*\n\n- lastseen\n- online\n- disappearmode\n- profilepic\n- status\n- readreceipt\n- groupinvite\n\nContoh :\n*${usedPrefix + command} lastseen all*`
	let ava = '```available value :```'
	if (somematch(['lastseen', 'profilepic', 'status', 'groupinvite'], x)) {
		if (!somematch(['all', 'contacts', 'contact_blacklist', 'none'], y)) throw ava+'\n\n"all" | "contacts" | "contact_blacklist" | "none"'
		if (x == 'lastseen') await conn.updateLastSeenPrivacy(y)
		if (x == 'profilepic') await conn.updateProfilePicturePrivacy(y)
		if (x == 'status') await conn.updateStatusPrivacy(y)
		if (x == 'groupinvite') await conn.updateGroupsAddPrivacy(y)
	} else if (x == 'online') {
		if (!somematch(['all', 'match_last_seen'], y)) throw ava+'\n\n"all" | "match_last_seen"'
		await conn.updateOnlinePrivacy(y)
	} else if (x == 'disappearmode') {
		if (!somematch(['1d', '7d', '90d', 'off'], y)) throw ava+'\n\n"1d" | "7d" | "90d" | "off"'
		await conn.updateDefaultDisappearingMode(y == '1d' ? 86400 : y == '7d' ? 604800 : y == '90d' ? 7776000 : 0)
	} else {
		if (!somematch(['all', 'none'], y)) throw ava+'\n\n"all" | "none"'
		await conn.updateReadReceiptsPrivacy(y)
	}
	m.reply(`Setting privasi *${x}* bot diubah menjadi *${y}*`)
}

handler.menuowner = ['setprivacy']
handler.tagsowner = ['owner']
handler.command = /^(setpr(ivacy)?)$/i

handler.owner = true

export default handler