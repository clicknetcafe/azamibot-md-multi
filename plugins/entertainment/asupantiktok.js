const username = ['natajadeh','aletaanovianda','faisafch','0rbby','cindyanastt','awaa.an','nadineabgail','ciloqciliq','carluskiey','wuxiaturuxia','joomblo','hxszys','indomeysleramu','anindthrc','m1cel','chrislin.chrislin','brocolee__',
	]

let handler = async (m, { conn, args, usedPrefix, command }) => {
	let pickuser = username[Math.floor(Math.random() * username.length)]
	let query = args[0] ? args[0] : pickuser
	try {
		let anu = await (await fetch(`https://api.botcahx.live/api/asupan/tiktok?query=${query}&apikey=${api[5]}`)).json()
		let capt = `乂 *${anu.result.data.author.nickname} (@${anu.result.data.author.username})*\n\n`
		capt += `  ◦ *Views* : ${anu.result.data.stats.play_count}\n`
		capt += `  ◦ *Likes* : ${anu.result.data.stats.digg_count}\n`
		capt += `  ◦ *Shares* : ${anu.result.data.stats.share_count}\n`
		capt += `  ◦ *Comments* : ${anu.result.data.stats.comment_count}\n`
		capt += `  ◦ *Duration* : ${anu.result.data.duration} sec\n`
		capt += `  ◦ *Sound* : ${anu.result.data.music.title} - ${anu.result.data.music.author}\n`
		capt += `  ◦ *Caption* : ${anu.result.data.caption || '-'}\n\n`
		await conn.sendFile(m.chat, anu.result.data.video, null, capt, m)
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