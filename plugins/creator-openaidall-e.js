import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `[!] Masukkan detail teks.`
	try {
		let res = await fetch(`https://api.lolhuman.xyz/api/dall-e?apikey=${apilol}&text=${encodeURIComponent(text)}`)
		let anu = Buffer.from(await res.arrayBuffer())
		if (Buffer.byteLength(anu) < 22000) throw Error(`[!] Error : Buffer not found.`)
		await conn.sendMessage(m.chat, { image: anu, caption: `Open AI Dall E :\n${text}` }, { quoted: m })
	} catch (e) {
		console.log(e)
		throw `Fitur Error.`
	}
}

handler.help = ['aiimage']
handler.tags = ['creator']
handler.command = /^((open)?ai(image|gambar|foto|dalle))$/i

handler.premium = true
handler.limit = true

export default handler