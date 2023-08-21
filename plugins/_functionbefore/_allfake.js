import db from '../../lib/database.js'
import fs from 'fs'

let handler = m => m
	handler.all = async function (m) {
	let d = new Date(new Date + 3600000)
	let timeh = `🕰️ ${d.toLocaleTimeString('id', { hour: 'numeric', minute: 'numeric', second: 'numeric' }).replaceAll('.',':')}`
	let datas = db.data.datas
	global.packname = datas.packname
	global.author = datas.author
	global.pauthor = datas.packname + ' - ' + datas.author
	// datas.api is array like ['apikey1','apikey2','etc']
	global.api = datas.api
	global.apilol = datas.api[0] || ''
	global.imgbb = datas.imgbb	// https://api.imgbb.com/
	global.ephemeral = '86400' // 86400 = 24jam, kalo ingin di hilangkan ganti jadi 'null' atau ''
	global.timeh = `🕰️ ${d.toLocaleTimeString('id', { hour: 'numeric', minute: 'numeric', second: 'numeric' }).replace(/./,':')}`
	
	//fake troli
	global.ftroli = { key: {participant : '0@s.whatsapp.net'}, message: { orderMessage: { itemCount: 2023, status: 1, surface: 1, message: timeh, ordertitle: pauthor, sellerJid: '0@s.whatsapp.net' } } }
	// fake kontak
	global.fkontak = { key: {participant : '0@s.whatsapp.net'}, message: { 'contactMessage': { 'displayName': this.getName(this.user.jid), 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pauthor},;;;\nFN:${pauthor},\nitem1.TEL;waid=${this.user.jid.split('@')[0]}:${this.user.jid.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, jpegThumbnail: fs.readFileSync('./media/thumbnail.jpg'), thumbnail: fs.readFileSync('./media/thumbnail.jpg'),sendEphemeral: true}}}
	// fake vn
	global.fvn = {
		key: { participant : '0@s.whatsapp.net'},
		message: { 
			audioMessage: {
				mimetype: 'audio/ogg; codecs=opus',
				seconds: 1000000000,
				ptt: true
			}
		}
	}
	// fake video
	global.fvid = {
		key: { participant : '0@s.whatsapp.net'},
		message: { videoMessage: { title: pauthor, h: 'Hmm',seconds: '12345', caption: timeh, jpegThumbnail: fs.readFileSync('./media/thumbnail.jpg')}}
	}
	// fake centang hijau
	global.ftextt = {
		key: { participant : '0@s.whatsapp.net'},
		message: {
			extendedTextMessage: {
				text: pauthor,
				title: timeh,
				jpegThumbnail: fs.readFileSync('./media/thumbnail.jpg')
			}
		}
	}
	// fake open AI
	global.fopenai = {
		key: { participant : this.user.jid},
		message: {
			extendedTextMessage: {
				text: '⚗️ Automatic Chatbot by Open AI',
				title: timeh,
				jpegThumbnail: fs.readFileSync('./media/thumbnail.jpg')
			}
		}
	}
	// fake location
	global.fliveLoc = {
	key: { participant : '0@s.whatsapp.net'},
		message: {
			liveLocationMessage: {
				caption: pauthor,
				h: timeh,
				jpegThumbnail: fs.readFileSync('./media/thumbnail.jpg')
			}
		}
	}
	// fake TEXT location
	global.fliveLoc2 = {
		key: { participant : '0@s.whatsapp.net'},
		message: { liveLocationMessage: {
			title: pauthor,
			h: timeh,
			jpegThumbnail: fs.readFileSync('./media/thumbnail.jpg')
		}}
	}
	// fake toko
	global.ftoko = {
		key: { participant : '0@s.whatsapp.net'},
		message: {
			productMessage: {
				product: {
					productImage: {
						mimetype: 'image/jpeg',
						jpegThumbnail: fs.readFileSync('./media/thumbnail.jpg')
					},
					title: pauthor,
					description: timeh, 
					currencyCode: 'USD',
					priceAmount1000: 20000000,
					retailerId: 'Ghost',
					productImageCount: 1
				},
				businessOwnerJid: `0@s.whatsapp.net`
			}
		}
	}
	//fake document
	global.fdocs = {
		key : { participant : '0@s.whatsapp.net'},
		message: {
			documentMessage: {
				title: pauthor, 
				jpegThumbnail: fs.readFileSync('./media/thumbnail.jpg')
			}
		}
	}
	// fake gif
	global.fgif = {
		key: { participant : '0@s.whatsapp.net'},
		message: { 
			videoMessage: {
				title: pauthor,
				h: 'Hmm',
				seconds: '999999999', 
				gifPlayback: 'true', 
				caption: timeh,
				jpegThumbnail: fs.readFileSync('./media/thumbnail.jpg')
			}
		}
	}
	//fake troli2
	global.ftrol = {
		key : {
		participant : '0@s.whatsapp.net'
		},
		message: {
			orderMessage: {
				itemCount : 841,
				//status: 1,
				//surface : 1,
				message: pauthor,
				//orderTitle: `anulah`,
				thumbnail: fs.readFileSync('./media/anime.jpg'),
				sellerJid: '0@s.whatsapp.net' 
			}
		}
	}
}

export default handler