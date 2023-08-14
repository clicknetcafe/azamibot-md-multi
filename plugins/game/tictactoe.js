import db from '../../lib/database.js'
import TicTacToe from '../../lib/tictactoe.js'

let handler = async (m, { conn, usedPrefix, command, text, isPrems }) => {
	let user = db.data.users[m.sender]
	if (user.limit < 1 && user.money > 50000 && !isPrems) throw `Beli limit dulu lah, duid lu banyak kan 😏`
	else if (user.limit > 0 && !isPrems) user.limit -= 1
	conn.game = conn.game ? conn.game : {}
	if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) throw 'Kamu masih didalam game'
	let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
	// m.reply('[WIP Feature]')
	if (room) {
		m.reply('Partner ditemukan!')
		room.o = m.chat
		room.game.playerO = m.sender
		room.state = 'PLAYING'
		let arr = room.game.render().map(v => {
			return {
				X: '❌',
				O: '⭕',
				1: '1️⃣',
				2: '2️⃣',
				3: '3️⃣',
				4: '4️⃣',
				5: '5️⃣',
				6: '6️⃣',
				7: '7️⃣',
				8: '8️⃣',
				9: '9️⃣',
			}[v]
		})
		let str = `
Room ID: ${room.id}
${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}
Menunggu @${room.game.currentTurn.split('@')[0]}
Ketik *nyerah* untuk nyerah
`.trim()
		if (room.x !== room.o) await conn.reply(room.x, str, m, {
			mentions: conn.parseMention(str)
		})
		await conn.reply(room.o, str, m, {
			mentions: conn.parseMention(str)
		})
	} else {
		room = {
			id: 'tictactoe-' + (+new Date),
			x: m.chat,
			o: '',
			game: new TicTacToe(m.sender, 'o'),
			state: 'WAITING'
		}
		if (text) room.name = text
		m.reply('Menunggu partner' + (text ? ` mengetik command dibawah ini
${usedPrefix}${command} ${text}` : ''))
		conn.game[room.id] = room
	}
}

handler.menufun = ['tictactoe', 'ttt'].map(v => v + ' [custom room name]')
handler.tagsfun = ['game']
handler.command = /^(tictactoe|t{3})$/

handler.premium = true
handler.game = true

export default handler