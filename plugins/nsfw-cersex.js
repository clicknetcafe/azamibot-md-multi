import db from '../lib/database.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let chat = db.data.chats[m.chat]
	if (!chat.nsfw && m.isGroup) throw `[ *NSFW GAK AKTIF* ]`
	text = text.split('||')
	let a = Math.floor(Math.random() * 49)
	if (command.includes('list') || command.includes('page')) {
		try {
			if (!text[1]) {
				let b = parseInt(text[0].replace(/\D/g,''))
				if (isNaN(b)) b = a
				let res = await fetch(`https://oni-chan.my.id/api/adults/cersex/view?page=${b > 49 ? a : b}&apikey=istighfar`)
				let anu = await res.json()
				let array = []
				anu.result.forEach(function(i) {
					array.push({
						title: `♢ ${i.date}`,
						rowId: usedPrefix + command + ` -||${i.url}`,
						description: i.title
					});
				});
				const sections = [
					{
						title: `━ ━ ━ ━ 『 Cersex Search 』 ━ ━ ━ ━`,
						rows: array
					}
				]
				const listMessage = {
					text: `*Request From :* @${m.sender.split`@`[0]}\n\n*Cersex :* ${b > 49 ? `*Page ${a} ( Default Random )*\n「❗」 page ${b} not found.` : `*Page ( ${b} )*`}`,
					mentions: [m.sender],
					footer: packname + ' - ' + author,
					title: `━ ━ 『 *SEX STORIES* 』 ━ ━`,
					buttonText: `Cersex Results`,
					sections
				}
				await conn.sendMessage(m.chat, listMessage, { quoted : m })
			} else {
				let res = await fetch(`https://oni-chan.my.id/api/adults/cersex/rawcerpen?link=${text[1]}&apikey=istighfar`)
				let json = await res.json()
				json = json.result
				await conn.sendMessage(m.chat, { image: { url: json.thumbnail }, caption: `*${json.title}*\n${(json.date.length > 30 || !json.text) ? `\n${json.date}` : `_${json.date}_\n\n${json.text}`}` }, { quoted: m })
			}
		} catch (e) {
			console.log(e)
			m.reply(`Terjadi kesalahan, coba lagi nanti.`)
		}
	} else {
		try {
			let res = await fetch(`https://docs-jojo.herokuapp.com/api/cersex`)
			let json = await res.json()
			await conn.sendMessage(m.chat, { image: { url: json.result.img }, caption: `*${json.result.judul}*\n\n${decodeURIComponent(JSON.parse('"' + json.result.cersex.replace(/\"/g, '\\"') + '"'))}` }, { quoted: m })
		} catch (e) {
			console.log(e)
			try {
				let res = await fetch(`https://oni-chan.my.id/api/adults/cersex/view?page=${a}&apikey=istighfar`)
				let json = await res.json()
				let res2 = await fetch(`https://oni-chan.my.id/api/adults/cersex/rawcerpen?link=${json.result[Math.floor(Math.random()*json.result.length)].url}&apikey=istighfar`)
				let json2 = await res2.json()
				json2 = json2.result
				await conn.sendMessage(m.chat, { image: { url: json2.thumbnail }, caption: `*${json2.title}*\n${(json2.date.length > 30 || !json2.text) ? `\n${json2.date}` : `_${json2.date}_\n\n${json2.text}`}` }, { quoted: m })
			} catch (e) {
				console.log(e)
				m.reply(`Terjadi kesalahan, coba lagi nanti.`)
			}
		}
	}
}

handler.menunsfw = ['cersex','cersexlist']
handler.tagsnsfw = ['search']
handler.command = /^(cersex(random|list|page)?)$/i

handler.premium = true
handler.limit = true

export default handler