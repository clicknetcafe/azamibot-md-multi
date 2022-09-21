import fetch from 'node-fetch'

let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example : *${usedPrefix + command} BunnyWalker*`
	try {
		let fimg = await fetch(`https://api.lolhuman.xyz/api/textprome/blackpink?apikey=${global.api}&text=${encodeURIComponent(text)}`)
	    //if (!fimg.ok) throw 'Fitur Error'
	    let fimgb = Buffer.from(await fimg.arrayBuffer())
		conn.sendFile(m.chat, fimgb, 'txpro2.jpg', `_Text Pro : ${command}_`, m)
	} catch (e) {
        console.log(e)
        m.reply(`Terjadi kesalahan, coba lagi nanti.`)
    }
}

handler.menutextpro = ['bpink <text>']
handler.tagstextpro = ['search']
handler.command = /^bpink$/i

handler.premium = true
handler.limit = true

export default handler