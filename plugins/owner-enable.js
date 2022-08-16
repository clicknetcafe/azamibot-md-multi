import db from '../lib/database.js'

String.prototype.includesOneOf = function(arrayOfStrings) {
	if(!Array.isArray(arrayOfStrings)) {
	throw new Error('includesOneOf only accepts an array')
	}
	return arrayOfStrings.some(str => this.includes(str))
}

let handler = async (m, { conn, usedPrefix, command, isOwner, args }) => {
	if (isOwner && m.isGroup) {
		if (!args[0] || !args[0].toLowerCase().includesOneOf(["on", "off"])) return m.reply(`Usage : ${usedPrefix + command} on / off\n\nExample : *${usedPrefix + command} on*`)
		if (command == 'antilink') {
			if (args[0] == 'on') {
				db.data.chats[m.chat].antiLink = true
			} else {
				db.data.chats[m.chat].antiLink = false
			}
		} else {
			if (args[0] == 'on') {
				db.data.chats[m.chat][`${command.toLowerCase()}`] = true
			} else {
				db.data.chats[m.chat][`${command.toLowerCase()}`] = false
			}
		}
	}
}

handler.command = /^(welcome|nsfw|game|antilink)$/i

export default handler