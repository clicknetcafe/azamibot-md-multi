import { sticker } from '../../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	try {
		let anu = await (await fetch(`https://raw.githubusercontent.com/clicknetcafe/Databasee/main/anime/${command}.json`)).json()
		if (command == 'loli' && text == 'mp4') anu = anu.filter(v => v.endsWith('raw=true')).getRandom()
		else anu = anu.getRandom()
		if (!anu) throw Error('error : no url')
		if (anu.toLowerCase().split('.').pop() == 'gif') {
			let buffer = await sticker(false, anu, packname, author)
			await conn.sendFile(m.chat, buffer, '', '', m)
		} else await conn.sendButton(m.chat, `_Random pic : ${command}_`, pauthor, anu, [[command, usedPrefix+command]], m)
	} catch (e) {
		console.log(e)
		m.reply('scrape failed')
	}
}

handler.menuanime = handler.command = ['akira','akiyama','ana','asuna','ayuzawa','boruto','chitanda','chitoge','deidara','doraemon','elaina','emilia','erza','gremory','hestia','hinata','husbu','icon','inori','isuzu','itachi','itori','kaga','kagura','kakasih','kaneki','kaori','keneki','kosaki','kotori','kuriyama','kuroha','kurumi','loli','madara','megumin','mikasa','miku','minato','naruto','natsukawa','nekonime','nezuko','nishimiya','onepiece','pokemon','rem','rize','sagiri','sakura','sasuke','shina','shinka','shizuka','shota','tomori','toukachan','tsunade','waifu2','yatogami','yuki']
handler.tagsanime = ['randompic']

handler.premium = true
handler.limit = true

export default handler