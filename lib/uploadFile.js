import { fileTypeFromBuffer } from 'file-type'
import axios from 'axios'

/**
 * Upload files to api.anonfiles.com
 * @param {Buffer} buffer Media Buffer
 * @return {Promise<string>}
 */
export default async (buffer, json = false) => {
	const { ext, mime } = await fileTypeFromBuffer(buffer)
	let form = new FormData()
	let host, link, filesize, status = true
	const r = (Math.random() + 1).toString(36).substring(2)
	const blob = new Blob([buffer], { type: mime })
	const filename = r+'.'+ext
	form.append(mime.includes('/') ? mime.split('/')[0] : 'file', blob, filename)
	try {
		let anu = await axios.post('https://api.anonfiles.com/upload', form, {
			headers: {
				//...form.getHeaders()
			}
		})
		anu = anu.data.data
		host = 'https://api.anonfiles.com'
		link = anu.file.url.short
		filesize = anu.file.metadata.size.readable
	} catch (e) {
		console.log(e)
		status = false
	}
	if (!status) return false
	if (json) return {
		status: true,
		result: {
			host: host,
			filename: filename,
			mimetype: mime,
			filesize: filesize,
			url: link
		}
	}
	else return link
}