import { ranNumb } from '../../lib/func.js'
import db from '../../lib/database.js'

export async function before(m) {
	if (!m.isGroup) return !1
	if (db.data.users[m.sender]?.banned) return !1
	if (m.text.toLowerCase() == 'bot') {
		if (ranNumb(1, 2) > 1) await this.reply(m.chat, bot.getRandom())
		else await this.sendFile(m.chat,
			`https://github.com/clicknetcafe/Databasee/raw/main/sfx/${sfx.getRandom()}.mp3`,
			'', '', null, true, {}, true)
	}
	if (m.text.toLowerCase() == 'ping') await this.reply(m.chat, ping.getRandom())
	return !0
}

const bot = ['ada apa bro ?','apa sih','apa sayang','jangan ngagetin dong','iya','kenapa dah','bodo amat','gua tandain muka lu','bukan, ini patrick','lu itu gak diajak','gua mulu ajg','menahan emosi','males','ada yang bisa dibantu ?','lagi tes sinyal ya ?','selalu disampingmu','selalu bersamamu','gini amat','tutor dek','ajarin puh','tingki wingky dipsy lala puh sepuhh','kerja bagus','titid','oi','halo rahmad','Dihina karena merasa miskin... ingat..!!! Gula ngga dia ada kenapa gitu manis apa tapi kopi ada... ya kan...!!!\nMikir...!!!','kamu tidur aja susah, apalagi bahagia','hah','surga itu di bawah telapak kaki ibu, terus kalo ibu nendang kita, apakah itu tendangan dari surga?','ga jelas kek rizki','agak bingung','mending tidur','kukira takdir ternyata cuma mampir','ada yang tidak beres']

const ping = ['pakai prefix','command yg betul','gak btul','contoh : .ping','pake titik coba','apa coba','Kecepatan Repon = Kecepatan Cahaya','yahaha ngemlag','pakai titik\n\n.ping gitu','waktunya bayar wifi','kuota mu sekarat','Ping : 0 miliseconds','adu .testspeed ?']

const sfx = [
	'desah-prank',
	'BANG%20UDAH%20BANG',
	'BOOM',
	'Emang%20Boleh%20versi%20anak%20kecil',
	'Gwenchana%20Kumenahan%20rasa%20sakit%20-Dean%20KT',
	'What%20the%20dog%20doing',
	'ack',
	'acumalaka_04ZUCRu',
	'agus-lapar',
	'anime-wow-sound-effect',
	'apaan-tuh',
	'aughhhhh-aughhhhh',
	'ayo-pukul-aku',
	'bawakdewak',
	'bercanda-bercandyaaa',
	'boleh',
	'bombastic-side-eye',
	'dari-mana-duit-nya',
	'directed-by-robert-b_voI2Z4T',
	'eh-eh-ehhhh',
	'final-chapter',
	'frog-laughing-meme',
	'grup-kontol',
	'gwenchana',
	'haah-lahhhhhh',
	'hansen-caunima-le-caunima-le',
	'hansen-lu-memang-anak-lanciau-mobile-legend',
	'kaget',
	'kerja-bagus-ff',
	'ketawa-bajaj-bajuri',
	'kiw-kiw-kuk-geruk-empuk-jeru',
	'krik-krik-krik',
	'kunti-bogel-anak-jurik',
	'memang-babi-kau-nih',
	'movie_1',
	'musuh-terlihat-ff',
	'patrick-pembohong-kau-pembohong',
	'pelan-pelan-pak-sopir_lQcRQb8',
	'rawr-krakatau',
	'sadar-diri-kamu_pqJ7DGg',
	'sangat-cocok-hansen',
	'sepuh',
	'spiderman-meme-song',
	'spongebob-fail',
	'suiiiiiiiiiii',
	'vestia-zeta-aa-jangan-dong-huhh-janganlah-yada',
	'what-the-hellllllllllll'
]