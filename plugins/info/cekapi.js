let handler = async (m, { text }) => {
	try {
		let res = await fetch(`https://api.lolhuman.xyz/api/checkapikey?apikey=${text ? text.trim() : api.lol}`)
		let anu = await res.json()
		if (anu.status != '200') return m.reply(anu.message)
		anu = anu.result
		let txt = `*Username : ${anu.username}*\n\n`
		txt += `*Account Type :* ${anu.account_type}\n`
		txt += `*Hit Today :* ${anu.today}${((anu.account_type.toLowerCase() != 'vip') && anu.today == 1000) ? ' ( Daily Limit Reached )' : ''}\n`
		txt += `*Total Hit :* ${anu.requests}\n`
		txt += `*Expired :* ${anu.expired}`
		await m.reply(txt)
	} catch (e) {
		console.log(e)
		m.reply(`Website Down !`)
	}
}

handler.help = ['cekapilol']
handler.tags = ['information']
handler.command = /^(ch?ec?kapi(key)?lol(human)?)$/i

export default handler