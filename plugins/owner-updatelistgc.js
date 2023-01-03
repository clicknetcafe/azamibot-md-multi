import db from '../lib/database.js'

let handler = async (m) => {
	let gc
	try { gc = await conn.groupFetchAllParticipating() }
	catch (e) { return m.reply('[!] rate-overlimit.') }
	let datas = db.data.datas
	datas.listgc = []
	for (let x of Object.keys(gc)) { datas.listgc.push(x) }
	m.reply('Berhasil update list grup.')
	console.log(db.data.datas.listgc)
}

handler.menuowner = ['updatelistgc']
handler.tagsowner = ['owner']
handler.command = /^(updatelist(gro?up|gc))$/i

handler.owner = true

export default handler