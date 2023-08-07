import db from './database.js'
import fetch from 'node-fetch'
import { fileTypeFromBuffer } from 'file-type'
import axios from 'axios'

/**
 * Upload image to telegra.ph or api.imgbb.com
 * Supported mimetype:
 * - `image/webp`
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`s
 * @param {Buffer} buffer Media Buffer
 * @return {Promise<string>}
 */
export default async buffer => {
	try {
		const { ext, mime } = await fileTypeFromBuffer(buffer)
		let form = new FormData()
		const blob = new Blob([buffer.toArrayBuffer()], { type: mime })
		form.append('file', blob, 'tmp.' + ext)
		let res = await fetch('https://telegra.ph/upload', {
			method: 'POST',
			body: form
		})
		let img = await res.json()
		return 'https://telegra.ph' + img[0].src
	} catch {
		try {
			const { ext, mime } = await fileTypeFromBuffer(buffer)
			let form = new FormData()
			let r = (Math.random() + 1).toString(36).substring(2)
			const blob = new Blob([buffer], { type: mime })
			form.append('image', blob, r+'.'+ext)
			let anu = await axios.post('https://api.imgbb.com/1/upload', form, {
				params: {
					'expiration': '259200',
					'key': db.data.datas.imgbb
				}
			})
			return anu.data.data.url
		} catch (e) {
			console.log(e)
			return false
		}
	}
}