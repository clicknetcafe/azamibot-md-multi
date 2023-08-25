let handler = async (m, { conn, command, text, usedPrefix }) => {
	if (!text) return m.reply(`Usage : ${usedPrefix + command} berenang`)
	try {
		let anu = await (await fetch(`https://api.lolhuman.xyz/api/kbbi?apikey=${api.lol}&query=${text.trim()}`)).json()
		if (anu.status != 200) throw Error(anu.message)
		anu = anu.result[0]
		let txt = `*nama : ${anu.nama}*\n\n`
		+ `*nomor :* ${anu.nomor}\n`
		+ `*kata dasar :* ${anu.kata_dasar.length > 0 ? anu.kata_dasar.join(', ') : ''}\n`
		+ `*pelafalan :* ${anu.pelafalan}\n`
		+ `*bentuk tidak baku :* ${anu.bentuk_tidak_baku.length > 0 ? anu.bentuk_tidak_baku.join(', ') : ''}\n`
		+ `*varian :* ${anu.varian.join(', ')}\n\n`
		+ `*[ MAKNA ]*`
		for (let x of anu.makna) {
			txt += `\n\n*deskripsi :* ${x.kelas[0].deskripsi}\n`
			txt += `*submakna :* ${x.submakna.join(', ')}`
			txt += `${x.contoh.length > 0 ? `\n*contoh :*\n- ${x.contoh.join('\n- ')}` : ''}`
			txt += `\n───────────────────`
		}
		m.reply(txt)
	} catch (e) {
		console.log(e)
		throw 'kata tidak valid / server down.'
	}
}

handler.help = ['kbbi <text>']
handler.tags = ['searching']
handler.command = /^(kbbi)$/i

export default handler