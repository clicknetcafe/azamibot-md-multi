import fs from 'fs'
import * as emoji from 'emoji-api'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Emojinya mana ?\n\nContoh : *${usedPrefix + command} 🤖*`
	let ztick = fs.readFileSync(`./media/sticker/bronya.webp`)
	try {
		let anu = args[1] ? await emoji.get(args[1]).twemoji() : await emoji.get(args[0]).twemoji()
		const sticker = new Sticker(anu, { pack: packname, author: author, type: StickerTypes.FULL })
		const buffer = await sticker.toBuffer()
		await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
	} catch (e) {
		console.log(e)
		await conn.sendFile(m.chat, ztick, 'sticker.webp', '', m)
	}
	/*if (text.includes('http') || text.includes('https')) {
		let ztick = fs.readFileSync(`./media/sticker/bronya.webp`)
		let teks = args[0]
		let bruh = args[1] ? args.slice(1).join(' ') : packname
		try {
			let stiker = await sticker(false, args[0], global.packname, global.author)
		} catch (e) {
			console.log(e)
			await conn.sendFile(m.chat, ztick, 'sticker.webp', '', m)
		}
	} else {
		try {
			let anu = args[1] ? await emoji.get(args[1]) : await emoji.get(args[0])
			let array = [];
			anu.images.forEach(function(i) {
				array.push({
					title: `🎯 ${i.vendor}`,
					rowId: `${usedPrefix}smojix ${i.url} ${i.vendor}`,
				});
			});
			const sections = [
				{
					title: `━ ━ ━ ━ 『 Emoji Stickers 』 ━ ━ ━ ━`,
					rows: array
				}
			]
			const listMessage = {
				text: `*Request From :* ${conn.getName(m.sender)}\n\n*Result :* ${args[1] ? args[1] : args[0]}`,
				footer: packname + ' - ' + author,
				title: `━ ━ 『 *Emoji Stickers* 』 ━ ━\n`,
				buttonText: `List Emojis 🎫`,
				sections
			}
			await conn.sendMessage(m.chat, listMessage, { quoted : m })
		} catch (e) {
			console.log(e)
			m.reply(`Cannot find emoji ${args[1] ? args[1] : args[0]} from others.`)
		}
	}*/
}

handler.help = ['semoji <emoji>']
handler.tags = ['searching']
handler.command = /^(s(tic?ker)?e?mojix?)$/i

handler.premium = true
handler.limit = true

export default handler