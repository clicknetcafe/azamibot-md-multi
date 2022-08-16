let handler = async (m, { conn, command }) => {
    conn.reply(m.chat, `*「 RECODED BY ZERENITY 」*

⭔ Multi Auth
_https://github.com/clicknetcafe/azamibot-md-multi_

⭔ Single Auth ( 1 file session )
_https://github.com/clicknetcafe/azamibot-md_

⭔ Azami node_modules
_https://cutt.ly/azamibot-md-modules_

*Original Base From :*
_https://github.com/BochilGaming_
`, m)
}

handler.command = /^(sc|sourcecode)$/i

export default handler