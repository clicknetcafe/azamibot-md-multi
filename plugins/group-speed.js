import Connection from '../lib/connection.js'
import { cpus as _cpus, totalmem, freemem } from 'os'
import os from 'os'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'

function runtime(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

let format = sizeFormatter({
	std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
	decimalPlaces: 2,
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn }) => {
	const groups = Object.values(await conn.groupFetchAllParticipating())
	const chats = Object.entries(Connection.store.chats).filter(([id, data]) => id && data.isChats)
	const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
	const used = process.memoryUsage()
	const cpus = _cpus().map(cpu => {
		cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
		return cpu
	})
	const cpu = cpus.reduce((last, cpu, _, { length }) => {
		last.total += cpu.total
		last.speed += cpu.speed / length
		last.times.user += cpu.times.user
		last.times.nice += cpu.times.nice
		last.times.sys += cpu.times.sys
		last.times.idle += cpu.times.idle
		last.times.irq += cpu.times.irq
		return last
	}, {
		speed: 0,
		total: 0,
		times: {
			user: 0,
			nice: 0,
			sys: 0,
			idle: 0,
			irq: 0
		}
	})
	let old = performance.now()
	let neww = performance.now()
	let speed = neww - old
	m.reply(`
Kecepatan Respon ${speed.toFixed(4)} detik

Runtime :\n*${runtime(process.uptime())}*
OS Uptime :\n*${runtime(os.uptime())}*

💬 Status :
- *${groupsIn.length < groups.length ? groups.length : groupsIn.length}* Group Chats
- *${groups.length}* Groups Joined
- *${groupsIn.length < groups.length ? 0 : groupsIn.length - groups.length}* Groups Left
- *${chats.length - groupsIn.length}* Personal Chats
- *${chats.length - ( groupsIn.length < groups.length ? 0 : groupsIn.length - groups.length )}* Total Chats

💻 *Server Info*
${cpus[0] ? `_${cpus[0].model.trim()} (${cpu.speed} MHZ)_\n` : ''}
RAM: ${format(totalmem() - freemem())} / ${format(totalmem())}
`.trim())
}

handler.menugroup = ['ping']
handler.tagsgroup = ['group']

handler.command = /^(p(i|o)ng|tes|test|info|ingfo|runtime)$/i
export default handler