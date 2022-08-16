import Connection from '../lib/connection.js'

let handler = async (m, { conn }) => {
    const chats = Object.entries(Connection.store.chats).filter(([id, data]) => id && data.isChats)
    const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
    const chats2 = Object.entries(Connection.store.chats).filter(([id, data]) => id && data.isChats && data.subject == '')
    const groupsOut = chats2.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
    let ini_txt = `*List Group :*\n${groupsIn.length} group in total, ${groupsOut.length} group left`
    for (let x of groupsIn) {
        for (let y in Object.keys(x)) {
            if (x[y].id == undefined || x[y].subject == undefined) {
                
            } else {
                if (x[y].id.includes('-')) {
                    ini_txt += `\n\nID : ${x[y].id.split('-')[1]}\n`
                } else {
                    ini_txt += `\n\nID : ${x[y].id}\n`
                }
                if (x[y].subject == '') {
                    ini_txt += `Status :  [ Bot Leave ]`
                } else {
                    ini_txt += `Name : ${x[y].subject}`
                }
            }
        }
    }
    m.reply(ini_txt)
}

handler.menugroup = ['groups', 'grouplist']
handler.tagsgroup = ['group']
handler.command = /^((gro?ups?list)|(listgro?ups?)|(listgc))$/i

export default handler