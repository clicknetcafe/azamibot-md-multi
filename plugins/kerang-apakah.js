let handler = async (m) => m.reply(`
*Pertanyaan:* ${m.text}
*Jawaban:* ${['Ya', 'Mungkin iya', 'Mungkin', 'Mungkin tidak', 'Tidak', 'Tidak mungkin'].getRandom()}
  `.trim(), null, m.mentionedJid ? {
  mentions: m.mentionedJid
} : {})

handler.menufun = ['apakah <teks>?']
handler.tagsfun = ['kerang']
handler.customPrefix = /(\?$)/
handler.command = /^apakah$/i

export default handler
