async function handler(m, { command }) {
	this.anonymous = this.anonymous ? this.anonymous : {}
	switch (command) {
		case 'next':
		case 'leave': {
			let room = Object.values(this.anonymous).find(room => room.check(m.sender))
			if (!room) return this.reply(m.chat, '_Kamu tidak sedang berada di anonymous chat_\n\nketik *.start* untuk mencari partner', m)
			m.reply('Ok')
			let other = room.other(m.sender)
			if (other) await this.reply(other, '_Partner meninggalkan chat_\n\nketik *.start* untuk mencari partner', m)
			delete this.anonymous[room.id]
			if (command === 'leave') break
		}
		case 'start': {
			if (Object.values(this.anonymous).find(room => room.check(m.sender))) return this.reply(m.chat, '_Kamu masih berada di dalam anonymous chat, menunggu partner_\n\nketik *.leave* untuk keluar', m)
			let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
			if (room) {
				await this.reply(room.a, '_Partner ditemukan!_', m)
				room.b = m.sender
				room.state = 'CHATTING'
				await this.reply(room.b, '_Partner ditemukan!_', m)
			} else {
				let id = + new Date
				this.anonymous[id] = {
					id,
					a: m.sender,
					b: '',
					state: 'WAITING',
					check: function (who = '') {
						return [this.a, this.b].includes(who)
					},
					other: function (who = '') {
						return who === this.a ? this.b : who === this.b ? this.a : ''
					},
				}
				await this.reply(m.chat, '_Menunggu partner..._\n\nketik *.leave* untuk keluar', m)
			}
			break
		}
	}
}

handler.menufun = ['start', 'leave', 'next']
handler.tagsfun = ['anonim']
handler.command = ['start', 'leave', 'next']

handler.private = true

export default handler