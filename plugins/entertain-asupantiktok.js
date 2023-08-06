import fetch from 'node-fetch'

const username = ['natajadeh','aletaanovianda','faisafch','0rbby','cindyanastt','awaa.an','nadineabgail','ciloqciliq','carluskiey','wuxiaturuxia','joomblo','hxszys','indomeysleramu','anindthrc','m1cel','chrislin.chrislin','brocolee__',
	]

let handler = async (m, { conn, args, usedPrefix, command }) => {
	let pickuser = username[Math.floor(Math.random() * username.length)]
	let query = args[0] ? args[0] : pickuser
	try {
		let api = await (await fetch(`https://api.botcahx.live/api/asupan/tiktok?query=${query}&apikey=${apilol}`)).json()
		console.log(api)
		let capt = `乂 *${api.result.data.author.nickname} (@${api.result.data.author.username})*\n\n`
		capt += `  ◦ *Views* : ${api.result.data.stats.play_count}\n`
		capt += `  ◦ *Likes* : ${api.result.data.stats.digg_count}\n`
		capt += `  ◦ *Shares* : ${api.result.data.stats.share_count}\n`
		capt += `  ◦ *Comments* : ${api.result.data.stats.comment_count}\n`
		capt += `  ◦ *Duration* : ${api.result.data.duration} sec\n`
		capt += `  ◦ *Sound* : ${api.result.data.music.title} - ${api.result.data.music.author}\n`
		capt += `  ◦ *Caption* : ${api.result.data.caption || '-'}\n\n`
		conn.sendFile(m.chat, api.result.data.video, null, capt, m)
	} catch (error) {
		throw `🚩 *Username Tidak Ditemukan*`
	}
}
handler.help = ['asupantiktok'].map(v => v + ' <username>')
handler.tags = ['entertainment']
handler.command = /^(asupantiktok)$/i

handler.limit = true

export default handler