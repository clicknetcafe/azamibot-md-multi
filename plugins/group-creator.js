import db from '../lib/database.js'

let handler = async (m) => {
	const data = [...global.owner.filter(([id, isCreator]) => id && isCreator), ...db.data.owner.filter(([id, isCreator]) => id && isCreator)]
	await conn.sendContact(m.chat, data.map(([id, name]) => [id, name]), m)
}

handler.menugroup = ['owner']
handler.tagsgroup = ['group']
handler.command = /^(owner|creator)$/i

export default handler