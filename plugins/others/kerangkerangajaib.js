let handler = async (m, { text, command, usedPrefix }) => {
	if (!text) throw `Use example ${usedPrefix}${command} i'm alien?`
	m.reply(`"${[
		'Mungkin suatu hari',
		'Tidak juga',
		'Tidak keduanya',
		'Kurasa tidak',
		'Ya',
		'Coba tanya lagi',
		'Tidak ada'
	].getRandom()}."`)
}

handler.menufun = ['kerang', 'kerangajaib'].map(v => v + ' <teks>')
handler.tagsfun = ['kerang']

handler.command = /^((kulit)?kerang(ajaib)?)$/i

export default handler
