const bot = ['ada apa bro ?','apa sih','apa sayang','jangan ngagetin dong','iya','kenapa dah','bodo amat','gua tandain muka lu','bukan, ini patrick','lu itu gak diajak','gua mulu ajg','menahan emosi','males','ada yang bisa dibantu ?','lagi tes sinyal ya ?','selalu disampingmu','selalu bersamamu','gini amat','tutor dek','ajarin puh','tingki wingky dipsy lala puh sepuhh','kerja bagus','titid','oi','halo rahmad','Dihina karena merasa miskin... ingat..!!! Gula ngga dia ada kenapa gitu manis apa tapi kopi ada... ya kan...!!!\nMikir...!!!','kamu tidur aja susah, apalagi bahagia','hah','surga itu di bawah telapak kaki ibu, terus kalo ibu nendang kita, apakah itu tendangan dari surga?','ga jelas kek rizki','agak bingung','mending tidur','kukira takdir ternyata cuma mampir','ada yang tidak beres']
const ping = ['pakai prefix','command yg betul','gak btul','contoh : .ping','pake titik coba','apa coba','Kecepatan Repon = Kecepatan Cahaya','yahaha ngemlag','pakai titik\n\n.ping gitu','waktunya bayar wifi','kuota mu sekarat','Ping : 0 miliseconds','adu .testspeed ?']

export async function before(m) {
	if (!m.isGroup) return !1
	if (m.text.toLowerCase() == 'bot') await this.reply(m.chat, bot.getRandom())
	if (m.text.toLowerCase() == 'ping') await this.reply(m.chat, ping.getRandom())
	return !0
}