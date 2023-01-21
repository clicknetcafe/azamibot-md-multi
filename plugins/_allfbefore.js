import fs from 'fs'

let handler = m => m
	handler.all = async function (m, { pauthor }) {
	let name = await this.getName(m.sender)
	let d = new Date(new Date + 3600000)
	let timeh = `🕰️ ${d.toLocaleTimeString('id', { hour: 'numeric', minute: 'numeric', second: 'numeric' }).replaceAll('.',':')}`
	// fake kontak
	global.gfkontak = { key: {participant : '0@s.whatsapp.net'}, message: { 'contactMessage': { 'displayName': this.getName(m.sender), 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pauthor},;;;\nFN:${pauthor},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg'), thumbnail: fs.readFileSync('./media/thumbnail.jpg'),sendEphemeral: true}}}

	// fake open AI
	global.gfopenai = {
		key: { participant : this.user.jid},
		message: {
			"extendedTextMessage": {
				"text": '⚗️ Automatic Chatbot by Open AI',
				"title": timeh,
				'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')
			}
		}
	}

	// fake location
	global.gfliveLoc = {
	key: { participant : '0@s.whatsapp.net'},
		message: {
			"liveLocationMessage": {
				"caption": pauthor,
				"h": timeh,
				'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')
			}
		}
	}

	// fake TEXT location
	global.gfliveLoc2 = {
		key: { participant : '0@s.whatsapp.net'},
		message: { "liveLocationMessage": {
			"title": pauthor,
			"h": timeh,
			'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')
		}}
	}
}

export default handler