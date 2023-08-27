async function lookup(url) {
	let anu
	try {
		anu = await fetch(`https://api.api-ninjas.com/v1/dnslookup?domain=${url}`, {
			headers: { 'X-Api-Key': 'E4/gdcfciJHSQdy4+9+Ryw==JHciNFemGqOVIbyv' },
			contentType: 'application/json'
		}).then(v => v.text())
		return JSON.stringify(JSON.parse(anu), null, 2)
	} catch (e) {
		console.log(e)
		anu = await fetch(`https://api.hackertarget.com/dnslookup/?q=${url}`).then(v => v.text())
		return anu
	}
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Masukkan Domain/Sub Domain!\n\n*Contoh:* botcahx.live`
	let anu = await lookup(text.replace(/^https?:\/\//, ''))
	m.reply(`*Hasil Dns Lookup ${text} :*\n\n${anu}`)
}

handler.help = ['lookup','dns']
handler.tags = ['information']
handler.command = /^(dns|lookup|dnslookup|hacktarget)$/i

handler.limit = true

export default handler