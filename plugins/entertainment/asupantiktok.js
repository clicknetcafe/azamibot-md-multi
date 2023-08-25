const username = ['natajadeh','aletaanovianda','faisafch','0rbby','cindyanastt','awaa.an','nadineabgail','ciloqciliq','carluskiey','wuxiaturuxia','joomblo','hxszys','indomeysleramu','anindthrc','m1cel','chrislin.chrislin','brocolee__',
	]

let handler = async (m, { conn, text, usedPrefix, command }) => {
	try {
		let anu = await (await fetch(`https://api.botcahx.live/api/asupan/tiktok?query=${text ? text : username.getRandom()}&apikey=${api.btchx}`)).json()
		anu = anu.result.data
		let capt = `乂 *${anu.author.nickname} (@${anu.author.username})*\n\n`
		+ `  ◦ *Views* : ${anu.stats.play_count}\n`
		+ `  ◦ *Likes* : ${anu.stats.digg_count}\n`
		+ `  ◦ *Shares* : ${anu.stats.share_count}\n`
		+ `  ◦ *Comments* : ${anu.stats.comment_count}\n`
		+ `  ◦ *Duration* : ${anu.duration} sec\n`
		+ `  ◦ *Sound* : ${anu.music.title} - ${anu.music.author}\n`
		+ `  ◦ *Caption* : ${anu.caption || '-'}\n\n`
		await conn.sendFile(m.chat, anu.video, null, capt, m)
	} catch (e) {
		console.log(e)
		throw `🚩 *Username Tidak Ditemukan*`
	}
}
handler.help = ['asupantiktok'].map(v => v + ' <username>')
handler.tags = ['entertainment']
handler.command = /^(asupantiktok)$/i

handler.limit = true

export default handler