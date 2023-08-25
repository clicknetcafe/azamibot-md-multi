let handler = async (m, { conn, command, text, usedPrefix }) => {
	if (!text) return m.reply(`Usage : ${usedPrefix + command} nomor_resi`)
	try {
		let anu = await (await fetch(`https://api.lolhuman.xyz/api/checkresi?apikey=${api.lol}&resi=${text.trim()}`)).json()
		if (anu.status != 200) throw Error(anu.message)
		anu = anu.result
		let txt = `*Resi : ${anu.resi}*\n\n`
		+ `*courier :* ${anu.courier}\n`
		+ `*ori_name :* ${anu.origin.name}\n`
		+ `*ori_add :* ${anu.origin.address}\n`
		+ `*dest_name :* ${anu.destination.name}\n`
		+ `*dest_add :* ${anu.destination.address}\n\n`
		+ `*[ HISTORY ]*`
		for (let x of anu.history) {
			txt += `\n\n*time :* ${x.time}\n`
			txt += `*note :* ${x.note}`
		}
		m.reply(txt)
	} catch (e) {
		console.log(e)
		throw 'invalid no_resi / server down.'
	}
}

handler.help = ['cekresi <no_resi>']
handler.tags = ['searching']
handler.command = /^(cekresi)$/i

export default handler