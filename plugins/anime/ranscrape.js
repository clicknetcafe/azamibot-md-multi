import { pickRandom } from '../../lib/func.js'
import { sticker } from '../../lib/sticker.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let res = await fetch(`https://raw.githubusercontent.com/clicknetcafe/Databasee/main/anime/${command}.json`)
		let anu = pickRandom(await res.json())
		if (!anu) throw Error('error : no url')
		if (anu.split('.').pop() == 'gif') {
			let buffer = await sticker(false, anu, packname, author)
			await conn.sendFile(m.chat, buffer, '', '', m)
		} else await conn.sendMsg(m.chat, { image: { url: anu }, caption: `_Random pic: ${command}_` }, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply('scrape failed')
	}
}

handler.menuanime = ['akira','akiyama','ana','asuna','ayuzawa','boruto','chitanda','chitoge','deidara','doraemon','elaina','emilia','erza','gremory','hestia','hinata','husbu','icon','inori','isuzu','itachi','itori','kaga','kagura','kakasih','kaneki','kaori','keneki','kosaki','kotori','kuriyama','kuroha','kurumi','loli','madara','mikasa','miku','minato','naruto','natsukawa','nekonime','nezuko','nishimiya','onepiece','pokemon','rem','rize','sagiri','sakura','sasuke','shina','shinka','shizuka','shota','tomori','toukachan','tsunade','waifu2','yatogami','yuki']
handler.tagsanime = ['randompic']
handler.command = /^(akira|akiyama|ana|asuna|ayuzawa|boruto|chitanda|chitoge|deidara|doraemon|elaina|emilia|erza|gremory|hestia|hinata|husbu|icon|inori|isuzu|itachi|itori|kaga|kagura|kakasih|kaneki|kaori|keneki|kosaki|kotori|kuriyama|kuroha|kurumi|loli|madara|mikasa|miku|minato|naruto|natsukawa|nekonime|nezuko|nishimiya|onepiece|pokemon|rem|rize|sagiri|sakura|sasuke|shina|shinka|shizuka|shota|tomori|toukachan|tsunade|waifu2|yatogami|yuki)$/i

handler.premium = true
handler.limit = true

export default handler