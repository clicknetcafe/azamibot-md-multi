let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let anu = await (await fetch(`https://raw.githubusercontent.com/BochilTeam/database/refs/heads/master/kata-kata/${/truth/.test(command) ? 'truth' : 'dare'}.json`)).json()
		m.reply(anu.getRandom())
	} catch (e) {
		console.log(e)
		m.reply('try again')
	}
}

handler.help = ['truth','dare']
handler.tags = ['entertainment']
handler.command = /^(truth|dare)$/i

handler.limit = true
handler.group = true

export default handler