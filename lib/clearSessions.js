import Helper from './helper.js'
import { promises as fs } from 'fs'
import { tmpdir, platform } from 'os'
import { join } from 'path'

const TIME = 1000 * 60 * 120 // 120 menit

const __dirname = Helper.__dirname(import.meta)

export default async function clearSessions() {
	const ses = [tmpdir(), join(__dirname, '../sessions')]
	const filename = []

	await Promise.allSettled(ses.map(async (dir) => {
		const files = await fs.readdir(dir)
		if (files.length > 3000) {
			for (const file of files) {
				if (file != 'creds.json') filename.push(join(dir, file))
			}
		}
	}))

	return await Promise.allSettled(filename.map(async (file) => {
		const stat = await fs.stat(file)
		if (stat.isFile() && (Date.now() - stat.mtimeMs >= TIME)) {
			if (platform() === 'win32') {
				let fileHandle
				try {
					fileHandle = await fs.open(file, 'r+')
				} catch (e) {
					return e
				} finally {
					await fileHandle?.close()
				}
			}
			await fs.unlink(file)
		}
	}))
}
