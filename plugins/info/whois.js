let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Masukkan Domain/Sub Domain!\n\n*Contoh:* botcahx.live`
	try {
		let options = {
			method: 'GET',
			headers: {
				'Authorization': `Token=${['6c7bd1ce704d92c90e2f78d42641a9ee0cbcef198a6ad62a3dd06deb22af6fd3','e60df1f533023bffc332178b8831d62760300d5e612893e3b4fae0a4d7176101'].getRandom()}`
			}
		}
		let response = await fetch(`https://whoisjson.com/api/v1/whois?domain=${text.replace(/^https?:\/\//, '')}`, options)
		let data = await response.json()
		m.reply(JSON.stringify(data, null, 2))
	} catch (e) {
		console.log(e)
	}
}

handler.help = ['whois']
handler.tags = ['information']
handler.command = /^(whois2?)$/i

handler.premium = true
handler.limit = true

export default handler