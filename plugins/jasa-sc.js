let handler = async (m, { conn, command }) => {
    conn.reply(m.chat, `*「 RECODED BY ZERENITY 」*

*Azami Multi Auth :*
_https://github.com/clicknetcafe/azamibot-md-multi_

*Azami Single Auth ( 1 file session ) :*
_https://github.com/clicknetcafe/azamibot-md_

*Original Base From :*
_https://github.com/BochilGaming_
`, m)
}

handler.command = /^(sc|sourcecode)$/i

export default handler