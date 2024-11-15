let handler = async (m, { conn }) => {
	let q = m.quoted ? m.quoted : m
	if (!q.viewOnce) throw 'Itu bukan pesan viewOnce'
	try {
		let txt = q.caption || ''
		await conn.sendFile(m.chat, await q.download(), '', txt, null, true, { mentions: conn.parseMention(txt), quoted: m })
	} catch (e) {
		console.log(e)
		throw 'already opened'
	}
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^((read)?viewonce|rvo)$/i

export default handler
