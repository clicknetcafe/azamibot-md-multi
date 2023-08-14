import db from '../../lib/database.js'

export async function before(m, { isAdmin, isPrems, isBotAdmin }) {
		if (m.sender.startsWith('212') || m.sender.startsWith('265')) {
			try {
				db.data.users[m.sender].banned = true
			} catch (e) {
				console.log(e)
			}
		}
	return !0
}