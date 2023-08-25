let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text || !text.includes('|')) throw `Usage : ${usedPrefix + command} text1|text2|text3\n\nExample: *${usedPrefix + command} Shiro|Neko*`
	let [l, r, s] = text.split`|`
	if (!l) throw `Input text1`
	if (!r) throw `Input text2`
	if (!s) throw `Input text3`
	try {
		let fimg = await fetch(`https://api.lolhuman.xyz/api/ephoto3/${command}?apikey=${api.lol}&text1=${encodeURIComponent(l)}&text2=${encodeURIComponent(r)}&text3=${encodeURIComponent(s)}`)
		if (!fimg.ok) throw new e()
		let fimgb = Buffer.from(await fimg.arrayBuffer())
		await conn.sendMsg(m.chat, { image: fimgb, caption: `_Ephoto 360 : ${command}_` }, { quoted: m })
	} catch (e) {
		m.reply(`Terjadi kesalahan, coba lagi nanti.`)
	}
}

handler.menuephoto = ['valorantbanner <text>']
handler.tagsephoto = ['search']
handler.command = /^(valorantbanner)$/i

handler.premium = true
handler.limit = true

export default handler