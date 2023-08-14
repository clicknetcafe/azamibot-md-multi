let handler = async (m, { usedPrefix }) => {
	await m.reply(`*Command Work in Private Chat :*

⭔ Anonymous and Kerang Ajaib in *${usedPrefix}funmenu*
⭔ All Commands in *${usedPrefix}genshinmenu*
⭔ All Tools, check in *${usedPrefix}allmenu* at the bottom.

⭔ ${usedPrefix}attp *―>* ${usedPrefix}attp2
⭔ ${usedPrefix}cekapi
⭔ ${usedPrefix}emojimix
⭔ ${usedPrefix}fb
⭔ ${usedPrefix}google
⭔ ${usedPrefix}gimage
⭔ ${usedPrefix}joox
⭔ ${usedPrefix}neko
⭔ ${usedPrefix}nekonsfw
⭔ ${usedPrefix}pinterest
⭔ ${usedPrefix}pinterest2
⭔ ${usedPrefix}randomnama
⭔ ${usedPrefix}stiker
⭔ ${usedPrefix}translate
⭔ ${usedPrefix}ttp
⭔ ${usedPrefix}ttp2 *―>* ${usedPrefix}ttp6
⭔ ${usedPrefix}wallhaven
⭔ ${usedPrefix}wallpaper
⭔ ${usedPrefix}wallpaper2
⭔ ${usedPrefix}wikimedia
⭔ ${usedPrefix}yt`)
}

handler.command = /^(priv(ate)?cmd)$/i

export default handler