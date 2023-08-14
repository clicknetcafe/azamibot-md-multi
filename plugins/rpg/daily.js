import db from '../../lib/database.js'

const rewards = {
  exp: 12000,
  money: 10000,
  potion: 5,
}
const cooldown = 86400000
let handler = async (m) => {
  let user = db.data.users[m.sender]
  if (new Date - user.lastclaim < cooldown) throw `You have already claimed this daily claim!, wait for *${((user.lastclaim + cooldown) - new Date()).toTimeString()}*`
  let text = ''
  for (let reward of Object.keys(rewards)) {
	if (!(reward in user)) continue
	user[reward] += rewards[reward]
	text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
  }
  m.reply(text.trim())
  user.lastclaim = new Date * 1
}

handler.menufun = ['daily', 'claim']
handler.tagsfun = ['rpg']
handler.command = /^(daily|claim)$/i

handler.cooldown = cooldown

export default handler
