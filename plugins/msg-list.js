import db from '../lib/database.js'

let handler = async (m, { usedPrefix, command }) => {
    let msgs = db.data.msgs
    let split = Object.entries(msgs).map(([nama, isi]) => { return { nama, ...isi } })
    let fltr = split.map(v => '│◦❒ ' + v.nama).join('\n')

    m.reply(`
┌「 LIST PESAN 」
${fltr}
└────
Akses/ambil dengan mengetik namanya
`.trim())
}

handler.menugroup = ['msg'].map(v => 'list' + v)
handler.tagsgroup = ['owner']
handler.command = /^(listmsg|msglist)$/i

handler.owner = true

export default handler
