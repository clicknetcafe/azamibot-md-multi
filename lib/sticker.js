import { dirname } from 'path'
import { fileURLToPath } from 'url'
import * as fs from 'fs'
import * as path from 'path'
import * as  crypto from 'crypto'
import { ffmpeg } from './converter.js'
import fluent_ffmpeg from 'fluent-ffmpeg'
import ff from 'fluent-ffmpeg'
import { spawn } from 'child_process'
import uploadFile from './uploadFile.js'
import uploadImage from './uploadImage.js'
import { fileTypeFromBuffer } from 'file-type'
import webp from 'node-webpmux'
import { tmpdir } from 'os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const tmp = path.join(__dirname, '../tmp')
/**
 * Image to Sticker
 * @param {Buffer} img Image Buffer
 * @param {String} url Image URL
 */
function sticker1(img, url) {
	return new Promise(async (resolve, reject) => {
		try {
			if (url) {
				let res = await fetch(url)
				if (res.status !== 200) throw await res.text()
				img = Buffer.from(await res.arrayBuffer())
			}
			let inp = path.join(tmp, +new Date + '.jpeg')
			await fs.promises.writeFile(inp, img)
			let ff = spawn('ffmpeg', [
				'-y',
				'-i', inp,
				'-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1',
				'-f', 'png',
				'-'
			])
			ff.on('error', reject)
			ff.on('close', async () => {
				await fs.promises.unlink(inp)
			})
			let bufs = []
			const [_spawnprocess, ..._spawnargs] = [...(global.support.gm ? ['gm'] : global.support.magick ? ['magick'] : []), 'convert', 'png:-', 'webp:-']
			let im = spawn(_spawnprocess, _spawnargs)
			im.on('error', e => conn.reply(m.chat, util.format(e), m))
			im.stdout.on('data', chunk => bufs.push(chunk))
			ff.stdout.pipe(im.stdin)
			im.on('exit', () => {
				resolve(Buffer.concat(bufs))
			})
		} catch (e) {
			reject(e)
		}
	})
}

function queryURL(queries) {
	return new URLSearchParams(Object.entries(queries))
}

/**
 * Image to Sticker
 * @param {Buffer} img Image/Video Buffer
 * @param {String} url Image/Video URL
 */
async function sticker2(img, url) {
	if (url) {
		let res = await fetch(url)
		if (res.status !== 200) throw await res.text()
		img = Buffer.from(await res.arrayBuffer())
	}
	return await ffmpeg(img, [
		'-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1'
	], 'jpeg', 'webp')
}

async function sticker3(img, url, packname, author, categories = [], extra = {}) {
	const { Sticker, StickerTypes } = await import('wa-sticker-formatter')
	const stickerMetadata = {
		type: 'default',
		pack: packname,
		author,
		type: StickerTypes.FULL,
		categories,
		...extra
	}
	return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}

/**
 * Convert using fluent-ffmpeg
 * @param {string} img 
 * @param {string} url 
 */
function sticker4(img, url) {
	return new Promise(async (resolve, reject) => {
		if (url) {
			let res = await fetch(url)
			if (res.status !== 200) throw await res.text()
			img = Buffer.from(await res.arrayBuffer())
		}
		const type = await fileTypeFromBuffer(img) || {
			mime: 'application/octet-stream',
			ext: 'bin'
		}
		if (type.ext == 'bin') reject(img)
		const tmp = path.join(__dirname, `../tmp/${+ new Date()}.${type.ext}`)
		const out = path.join(tmp + '.webp')
		await fs.promises.writeFile(tmp, img)
		// https://github.com/MhankBarBar/termux-wabot/blob/main/index.js#L313#L368
		let Fffmpeg = /video/i.test(type.mime) ? fluent_ffmpeg(tmp).inputFormat(type.ext) : fluent_ffmpeg(tmp).input(tmp)
		Fffmpeg
			.on('error', function (err) {
				console.error(err)
				fs.promises.unlink(tmp)
				reject(img)
			})
			.on('end', async function () {
				fs.promises.unlink(tmp)
				resolve(await fs.promises.readFile(out))
			})
			.addOutputOptions([
				`-vcodec`, `libwebp`, `-vf`,
				`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`
			])
			.toFormat('webp')
			.save(out)
	})
}
/**
 * Add WhatsApp JSON Exif Metadata
 * Taken from https://github.com/pedroslopez/whatsapp-web.js/pull/527/files
 * @param {Buffer} webpSticker 
 * @param {String} packname 
 * @param {String} author 
 * @param {String} categories 
 * @param {Object} extra 
 * @returns 
 */
async function addExif(webpSticker, packname, author, categories = [], extra = {}) {
	const img = new webp.Image();
	const stickerPackId = crypto.randomBytes(32).toString('hex');
	const json = { 'sticker-pack-id': stickerPackId, 'sticker-pack-name': packname, 'sticker-pack-publisher': author, 'emojis': categories, 'link-group-bot': 'https://cutt.ly/azamilaifu2', 'link-script-github': 'https://github.com/clicknetcafe/azamibot-md-multi', ...extra };
	let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
	let jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
	let exif = Buffer.concat([exifAttr, jsonBuffer]);
	exif.writeUIntLE(jsonBuffer.length, 14, 4);
	await img.load(webpSticker)
	img.exif = exif
	return await img.save(null)
}

/**
 * Image/Video to Sticker
 * @param {Buffer} img Image/Video Buffer
 * @param {String} url Image/Video URL
 * @param {...String} 
*/
async function sticker(img, url, ...args) {
	let lastError, stiker
	for (let func of [
		global.support.ffmpeg && sticker4, sticker3,
		global.support.ffmpeg && global.support.ffmpegWebp && sticker2,
		global.support.ffmpeg && (global.support.convert || global.support.magick || global.support.gm) && sticker1
	].filter(f => f)) {
		try {
			stiker = await func(img, url, ...args)
			if (stiker.includes('html')) continue
			if (stiker.includes('WEBP')) {
				try {
					return await addExif(stiker, ...args)
				} catch (e) {
					console.error(e)
					return stiker
				}
			}
			throw stiker.toString()
		} catch (err) {
			lastError = err
			continue
		}
	}
	console.error(lastError)
	return lastError
}

async function video2webp(media, fps = 15) { 
	const tmpFileOut = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
	const tmpFileIn = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`)
	fs.writeFileSync(tmpFileIn, media)
	await new Promise((resolve, reject) => {
		ff(tmpFileIn)
		.on("error", reject)
		.on("end", () => resolve(true))
		.addOutputOptions([
			"-vcodec",
			"libwebp",
			"-vf",
			`scale='min(320,512)':min'(320,512)':force_original_aspect_ratio=decrease,fps=${fps}, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
			"-loop",
			"0",
			"-ss",
			"00:00:00",
			"-t",
			"00:00:05",
			"-preset",
			"default",
			"-an",
			"-vsync",
			"0"
		])
		.toFormat("webp")
		.save(tmpFileOut)
	})
	const buff = fs.readFileSync(tmpFileOut)
	fs.unlinkSync(tmpFileOut)
	fs.unlinkSync(tmpFileIn)
	return buff
}

const support = {
	ffmpeg: true,
	ffprobe: true,
	ffmpegWebp: true,
	convert: true,
	magick: false,
	gm: false,
	find: false
}

export {
	sticker,
	sticker1,
	sticker2,
	sticker3,
	sticker4,
	video2webp,
	addExif,
	support
}