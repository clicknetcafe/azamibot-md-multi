let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let anu = await (await fetch('https://raw.githubusercontent.com/ketchupmaze/AssistenYulaDB/refs/heads/main/anime/storyanime.json')).json()
		await conn.sendButton(m.chat, `_Random Story ${command.replace('story','')}_`, pauthor, anu.getRandom(), [[command, usedPrefix+command]], m)
	} catch (e) {
		console.log(e)
		m.reply(e.message || 'internal server error.')
	}
}

handler.menuanime = ['anime'].map(v => 'story'+v)
handler.tagsanime = ['randommp4']
handler.command = /^(story(anime))$/i

handler.premium = true
handler.limit = true

export default handler