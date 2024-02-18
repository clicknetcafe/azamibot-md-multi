import fs from 'fs'
import util from 'util'
import * as pe from 'child_process'

const exec = util.promisify(pe.exec)

let handler = async (m, { conn, command, usedPrefix }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/webp/.test(mime) || /ptv/.test(q.mtype) || q.isAnimated) {
		try {
			let buf = await q.download()
			let out = /ptv/.test(q.mtype) ? buf : await converter(buf)
			await conn.sendMsg(m.chat, { video: out, gifPlayback: /gif/i.test(command), gifAttribution: ~~(Math.random() * 2) }, { caption: '*DONE*', quoted: m });
		} catch (e) {
			console.log(e)
			m.reply('conversion failed')
		}
	} else throw `Reply sticker / ptv with command *${usedPrefix + command}*`
}

handler.help = ['ptvtovideo','togif','tomp4']
handler.tags = ['tools']
handler.command = /^((ptv)?to(gif|mp4|video))$/i

export default handler

const converter = async bufferImage => {
	try {
		let pathFile = "./tmp/" + ~~(Math.random() * 1000000 + 1) + ".webp";
		fs.writeFileSync(pathFile, bufferImage);
		await exec(`convert ${pathFile} ${pathFile}.gif`);
		await exec(`ffmpeg -i ${pathFile}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${pathFile}.mp4`);
		if (!fs.existsSync(pathFile + ".gif") || !fs.existsSync(pathFile + ".mp4")) {
			throw new Error("Failed convert file!");
		}
		let videoBuffer = fs.readFileSync(pathFile + ".mp4");
		fs.unlinkSync(pathFile);
		fs.unlinkSync(pathFile + ".gif");
		fs.unlinkSync(pathFile + ".mp4");
		return videoBuffer;
	} catch(error) {
		throw error;
	}
}