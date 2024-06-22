let handler = async (m, { conn, command }) => {
	conn.reply(m.chat, `*「 BY ZERENITY 」*

*⭔ Multi Auth ( multiple file session )*
https://github.com/clicknetcafe/azamibot-md-multi`, m)
}

handler.command = /^(sc|sourcecode)$/i

export default handler