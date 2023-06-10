let handler = async (m, { conn, command }) => {
	conn.reply(m.chat, `*「 RECODED BY ZERENITY 」*

*⭔ Multi Auth ( multiple file session )*
_https://github.com/clicknetcafe/azamibot-md-multi_

*⭔ Azami node_modules*
_https://cutt.ly/azamibot-md-modules_`, m)
}

handler.command = /^(sc|sourcecode)$/i

export default handler