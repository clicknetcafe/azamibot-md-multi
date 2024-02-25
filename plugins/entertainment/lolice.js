let handler = async (m, { conn, usedprefix }) => {
	let who = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
	await conn.sendFile(m.chat, global.API('https://some-random-api.ml', '/canvas/lolice', {
		avatar: await conn.profilePictureUrl(who).catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
	}), '', `liuliuliuliuliu kami dengar disini ada lolicon`, m)
}

handler.help = ['lolice']
handler.tags = ['entertainment']
handler.command = /^(lolice)$/i

handler.premium = true
handler.limit = true

export default handler