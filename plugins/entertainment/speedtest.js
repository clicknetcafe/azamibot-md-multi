import cp from 'child_process'
import { promisify } from 'util'
let exec = promisify(cp.exec).bind(cp)

let handler = async (m) => {
	m.reply(`_testing speed . . ._`)
	let o
	try {
		o = await exec('py speed.py') // py / python / python3
	} catch (e) {
		o = e
	} finally {
		let { stdout, stderr } = o
		if (stdout.trim()) m.reply(stdout.replaceAll('..', ''))
		if (stderr.trim()) m.reply(stderr)
	}
}

handler.help = ['speedtest']
handler.tags = ['entertainment']
handler.command = /^(speed(test?)?)$/i

export default handler