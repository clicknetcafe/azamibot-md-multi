let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Usage : ${usedPrefix + command} username\n\nExample: *${usedPrefix + command} xxhonorxx*`
	try {
		let res = await fetch(`https://api.lolhuman.xyz/api/osuname/${encodeURIComponent(text)}?apikey=${api.lol}`)
		let json = await res.json()
		let get_result = json.result
		let txt = `User ID : ${get_result.user_id} - ${get_result.country}\n`
		txt += `Username : *${get_result.username}*\n`
		txt += `Join Date : ${get_result.join_date}\n\n`
		txt += `count300 : ${get_result.count300}\n`
		txt += `count100 : ${get_result.count100}\n`
		txt += `count50 : ${get_result.count50}\n\n`
		txt += `playcount : ${get_result.playcount}\n`
		txt += `Ranked Score : ${get_result.ranked_score}\n\n`
		txt += `Total Score : ${get_result.total_score}\n`
		txt += `PP Rank : ${get_result.pp_rank}\n`
		txt += `Level : *${Number(get_result.level).toFixed(2)}*\n`
		txt += `PP Raw : *${Number(get_result.pp_raw).toFixed(2)}*\n`
		txt += `Accuracy : *${Number(get_result.accuracy).toFixed(4)} %*\n\n`
		txt += `count_rank_ss : *${get_result.count_rank_ss}*\n`
		txt += `count_rank_ssh : *${get_result.count_rank_ssh}*\n`
		txt += `count_rank_s : *${get_result.count_rank_s}*\n`
		txt += `count_rank_sh : *${get_result.count_rank_sh}*\n`
		txt += `count_rank_a : *${get_result.count_rank_a}*\n`
		txt += `total_sec_played : *${get_result.total_seconds_played}*\n`
		txt += `pp_country_rank : *${get_result.pp_country_rank}*\n`
		await m.reply(txt)
	} catch (e) {
		console.log(e)
		m.reply('Fitur Error!')
	}
}

handler.help = ['osuplayer <username>']
handler.tags = ['information']
handler.command = /^(osuplayer)$/i

handler.premium = true
handler.limit = true

export default handler