import db from './database.js'
import fetch from 'node-fetch'
import { fileTypeFromBuffer } from 'file-type'
import axios from 'axios'

/**
 * Upload files to api.anonfiles.com
 * @param {Buffer} buffer Media Buffer
 * @return {Promise<string>}
 */
export default async buffer => {
	try {
		const { ext, mime } = await fileTypeFromBuffer(buffer)
		let form = new FormData()
		let r = (Math.random() + 1).toString(36).substring(2)
		const blob = new Blob([buffer], { type: mime })
		form.append('file', blob, r+'.'+ext);
		let anu = await axios.post('https://api.anonfiles.com/upload', form, {
			headers: {
				//...form.getHeaders()
			}
		})
		return anu.data
	} catch (e) {
		console.log(e)
		return false
	}
}