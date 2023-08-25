let handler = async (m, { conn, command, text, usedPrefix }) => {
	if (!text) return m.reply(`Example: *${usedPrefix + command} heartbeat*`)
	if (text == 'ongoing') {
		let anu = await (await fetch(`https://api.lolhuman.xyz/api/drakorongoing?apikey=${api.lol}`)).json()
		if (anu.status != 200) return m.reply('Internal server error')
		anu = anu.result
		let txt = `*Found ${anu.length} Result*`
		for (let x of anu) {
			txt += `\n\n*${x.title}*\n`
			txt +=`*year :* ${x.year}\n`
			txt +=`*episode :* ${x.total_episode}\n`
			txt += `*genre :* ${x.genre.join(', ')}\n`
			txt +=`_${x.link}_\n`
			txt += `───────────────────`
		}
		await conn.sendMsg(m.chat, { image: { url: anu[0].thumbnail }, caption: txt }, { quoted: m }).catch(_ => m.reply(txt))
	} else {
		m.reply(`[ maintenance ]\n\n*${usedPrefix + command} ongoing* untuk melihat list ongoing`)
	}
}

handler.help = ['drakor ongoing','drakor <query>']
handler.tags = ['searching']
handler.command = /^(drakor)$/i

export default handler