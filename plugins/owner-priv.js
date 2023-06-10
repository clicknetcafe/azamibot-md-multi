import { somematch } from '../lib/others.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!somematch(['lastseen', 'online', 'disappearmode', 'profilepic', 'status', 'readreceipt', 'groupinvite'], args[0])) throw `*Privasi yang dapat diatur :*\n\n- lastseen\n- online\n- disappearmode\n- profilepic\n- status\n- readreceipt\n- groupinvite\n\nContoh :\n*${usedPrefix + command} lastseen all*`
	let value = ['all', 'contacts', 'contact_blacklist', 'none']
	let value2 = ['all', 'match_last_seen']
	let value3 = ['all', 'none']
	let info = '```available value :```\n\n"all" | "contacts" | "contact_blacklist" | "none"'
	let info2 = '```available value :```\n\n"all" | "match_last_seen"'
	let info3 = '```available value :```\n\n"all" | "none"'
	if (somematch(['lastseen', 'profilepic', 'status', 'groupinvite'], args[0])) {
		if (!somematch(['all', 'contacts', 'contact_blacklist', 'none'], args[1])) throw '```available value :```\n\n"all" | "contacts" | "contact_blacklist" | "none"'
		if (args[0] == 'lastseen') await conn.updateLastSeenPrivacy(args[1])
		if (args[0] == 'profilepic') await conn.updateProfilePicturePrivacy(args[1])
		if (args[0] == 'status') await conn.updateStatusPrivacy(args[1])
		if (args[0] == 'groupinvite') await conn.updateGroupsAddPrivacy(args[1])
	} else if (args[0] == 'online') {
		if (!somematch(['all', 'match_last_seen'], args[1])) throw '```available value :```\n\n"all" | "match_last_seen"'
		await conn.updateOnlinePrivacy(args[1])
	} else if (args[0] == 'disappearmode') {
		if (!somematch(['1d', '7d', '90d', 'off'], args[1])) throw '```available value :```\n\n"1d" | "7d" | "90d" | "off"'
		await conn.updateDefaultDisappearingMode(args[1] == '1d' ? 86400 : args[1] == '7d' ? 604800 : args[1] == '90d' ? 7776000 : 0)
	} else {
		if (!somematch(['all', 'none'], args[1])) throw '```available value :```\n\n"all" | "none"'
		await conn.updateReadReceiptsPrivacy(args[1])
	}
	m.reply(`Setting privasi *${args[0]}* bot diubah menjadi *${args[1]}*`)
}

handler.menuowner = ['setprivacy']
handler.tagsowner = ['owner']
handler.command = /^(setpr(ivacy)?)$/i

handler.owner = true

export default handler