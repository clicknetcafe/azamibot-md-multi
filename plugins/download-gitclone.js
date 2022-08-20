import fetch from 'node-fetch'

const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Example user ${usedPrefix}${command} https://github.com/clicknetcafe/azamibot-md`
	if (!regex.test(args[0])) throw 'Invalid repositories!'
	try {
		let [_, user, repo] = args[0].match(regex) || []
		repo = repo.replace(/.git$/, '')
		let url = `https://api.github.com/repos/${user}/${repo}/zipball`
		let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
		m.reply(`*_sending file, don't spam . . ._*`)
		conn.sendFile(m.chat, url, filename.replace('.zip.zip','.zip'), null, m)
	} catch (e) {
		console.log(e)
		m.reply(`[!] repositorie(s) not found.`)
	}
}

handler.menudownload = ['gitclone']
handler.tagsdownload = ['search']
handler.command = /^(gitclone)$/i

handler.premium = true
handler.limit = true

export default handler