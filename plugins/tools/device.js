let handler = async (m) => {
	let q = m.quoted ? m.quoted : m
	m.reply(q.device)
}

handler.help = ['device']
handler.tags = ['tools']
handler.command = /^(device)$/i

export default handler
