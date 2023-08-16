import Connection from '../../lib/connection.js'
import { cpus as _cpus, totalmem, freemem } from 'os'
import os from 'os'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
import { runtime } from '../../lib/func.js'

let format = sizeFormatter({
	std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
	decimalPlaces: 2,
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn }) => {
	let groups
	try { groups = Object.values(await conn.groupFetchAllParticipating()) }
	catch { return }
	let chats = Object.entries(Connection.store.chats).filter(([id, data]) => id && data.isChats)
	let groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
	let used = process.memoryUsage()
	let cpu = _cpus().map(cpu => {
		cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
		return cpu
	})
	cpu = cpu[0] ? cpu[0] : ''
	let old = performance.now()
	let neww = performance.now()
	let speed = neww - old
	let txt = `Kecepatan Respon ${speed.toFixed(4)} detik\n\n`
	txt += `Runtime :\n*${runtime(process.uptime())}*\n`
	txt += `OS Uptime :\n*${runtime(os.uptime())}*\n\n`
	txt += `💬 Status :\n- *${groupsIn.length < groups.length ? groups.length : groupsIn.length}* Group Chats\n`
	txt += `- *${groups.length}* Groups Joined\n`
	txt += `- *${groupsIn.length < groups.length ? 0 : groupsIn.length - groups.length}* Groups Left\n`
	txt += `- *${chats.length - groupsIn.length}* Personal Chats\n`
	txt += `- *${chats.length - ( groupsIn.length < groups.length ? 0 : groupsIn.length - groups.length )}* Total Chats\n\n`
	txt += `💻 *Server Info*\n${cpu ? `_${cpu.model.trim()} (${cpu.speed} MHZ)_\n` : ''}\n`
	txt += `RAM: ${format(totalmem() - freemem())} / ${format(totalmem())}`
	await m.reply(txt)
}

handler.menugroup = ['ping']
handler.tagsgroup = ['group']
handler.command = /^(p(i|o)ng|tes|test|info|ingfo|runtime)$/i

export default handler