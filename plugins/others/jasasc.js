let handler = async (m, { conn, command }) => {
	conn.reply(m.chat, `*「 RECODED BY ZERENITY 」*

*⭔ Multi Auth ( multiple file session )*
https://github.com/clicknetcafe/azamibot-md-multi

*⭔ Azami node_modules*
https://cutt.ly/zeren-node-modules`, m)
}

handler.command = /^(sc|sourcecode)$/i

export default handler