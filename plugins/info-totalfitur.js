import fs from 'fs'
let handler = async (m, { conn, args, command }) => {
let mall = Object.values(global.plugins).filter((v) => v.help).length
let mnime = Object.values(global.plugins).filter((v) => v.menuanime).length
let mdonlod = Object.values(global.plugins).filter((v) => v.menudownload).length
let meditor = Object.values(global.plugins).filter((v) => v.menueditor).length
let mephoto = Object.values(global.plugins).filter((v) => v.menuephoto).length
let mfun = Object.values(global.plugins).filter((v) => v.menufun).length
let mgenshin = Object.values(global.plugins).filter((v) => v.menugenshin).length
let mgroup = Object.values(global.plugins).filter((v) => v.menugroup).length
let mnsfw = Object.values(global.plugins).filter((v) => v.menunsfw).length
let moxy = Object.values(global.plugins).filter((v) => v.menuoxy).length
let mtexpro = Object.values(global.plugins).filter((v) => v.menutextpro).length

let tod = mall + mnime + mdonlod + meditor + mephoto + mfun + mgenshin + mgroup + mnsfw + moxy + mtexpro
let ini_txt = `all : ${mall}\n`
ini_txt += `anime : ${mnime}\n`
ini_txt += `download : ${mdonlod}\n`
ini_txt += `editor : ${meditor}\n`
ini_txt += `ephoto : ${mephoto}\n`
ini_txt += `fun : ${mfun}\n`
ini_txt += `genshin : ${mgenshin}\n`
ini_txt += `group : ${mgroup}\n`
ini_txt += `nsfw : ${mnsfw}\n`
ini_txt += `oxy : ${moxy}\n`
ini_txt += `textpro : ${mtexpro}\n\n`
ini_txt += `Total fitur : ${tod}`
m.reply(ini_txt)
}


handler.help = ['totalfitur']
handler.tags = ['information']
handler.command = /^(totalfitur)$/i

export default handler