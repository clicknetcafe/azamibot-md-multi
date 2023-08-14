let handler = async (m, { conn, usedPrefix, command, text }) => {
	if (!text) throw `Usage :\n*${usedPrefix+command} text1 | text2*`
	let [l, r] = text.split`|`
	if (!r) r = ''
	m.reply(l + readMore + r)
}

handler.help = ['readmore <teks>|<teks>']
handler.tags = ['tools']
handler.command = /^(spoiler|hidetext|(read)?more|selengkapnya)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)