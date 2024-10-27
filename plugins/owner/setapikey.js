let handler = async (m, { conn, usedPrefix, command, args }) => {
	let jstring = JSON.stringify(api, null, 4)
	if (/set|add/.test(command)) {
		if (!args[0]) throw `[!] Input api_name and apikey.\nExample : ${usedPrefix+command} rose z3renity213\n\n*${usedPrefix}cekapi* to show your api list.\n*${usedPrefix}editapi* to edit your api.\n*${usedPrefix}delapi* to delete.`
		if (api[args[0]]) throw `api '${args[0]}' already exist, use other name or *${usedPrefix}editapi*`
		if (!/^[-\w\s]+$/.test(args[0])) throw `api_name allow only alphanumeric`
		if (!args[1]) throw `[!] Input apikey, example :\n\n*${usedPrefix+command} ${args[0]} zeren_4p1*`
		api[args[0]] = args[1] || 'undefined'
		m.reply(`Add APIKEY '${args[0]}' success :\n*${args[1]}*\n\n*${usedPrefix}cekapi* to check.`)
	} else if (/cek/.test(command)) {
		await conn.reply(m.sender, `*YOUR APIKEY LIST :*\n\n${jstring}`, m)
	} else {
		if(Object.keys(api).length == 0) throw `[!] No apikey, please *${usedPrefix}addapi* first`
		let tx = 'Remove'
		let txt = jstring
		+ `\n\nExample : *${usedPrefix + command} ${Object.keys(api)[0]}${/del/.test(command) ? '' : ' new_key'}*`
		if (!args[0]) return m.reply(txt)
		if (!api[args[0]]) throw `'${args[0]}' not on the list, *${usedPrefix}cekapi* to check`
		if (/edit/.test(command)) {
			tx = 'Edit'
			if (!args[1]) throw `Input your new apikey.\n\nExample : *${usedPrefix + command} ${args[0]} new_apikey*`
			api[args[0]] = args[1]
		} else {
			delete api[args[0]]
		}
		m.reply(`*${tx} Success, new apikey list :*\n\n${JSON.stringify(api, null, 4)}`)
	}
}

handler.menuowner = ['add','cek','edit','delete'].map(v => v+'api')
handler.tagsowner = ['ownerr']
handler.command = /^((add|cek|edit|del(ete)?)(api(key)?))$/i

handler.private = true
handler.rowner = true

export default handler