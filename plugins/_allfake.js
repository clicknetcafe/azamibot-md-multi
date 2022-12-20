import db from '../lib/database.js'
import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import { pickRandom } from '../lib/others.js'

let handler = m => m
	handler.all = async function (m) {
	let name = await this.getName(m.sender)
	let d = new Date(new Date + 3600000)
	let locale = 'id'
	let timeh = `🕰️ ${d.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' }).replaceAll('.',':')}`
	try {
		pp = await this.profilePictureUrl(m.sender, 'image')
	} catch (e) {
	} finally {
		global.packname = db.data.datas.packname || '-'
		global.author = db.data.datas.author || '-'
		global.api = global.db.data.datas.api || 'apilolhuman'	// https://api.lolhuman.xyz/docs
		global.imgbb = global.db.data.datas.imgbb || 'apiimgbb'	// https://api.imgbb.com/
		global.ucapan = ucapan()

		// Module
		const _uptime = process.uptime() * 1000
		// pesan sementara
		global.ephemeral = '86400' // 86400 = 24jam, kalo ingin di hilangkan ganti '86400' jadi 'null' atau ''

		// fake troli
		global.ftroli = { key: {participant : '0@s.whatsapp.net'}, message: { orderMessage: { itemCount: 2023, status: 1, surface: 1, message: timeh, ordertitle: packname + ' - ' + author, sellerJid: '0@s.whatsapp.net' } } }

		// fake kontak
		global.fkontak = { key: {participant : '0@s.whatsapp.net'}, message: { 'contactMessage': { 'displayName': this.getName(m.sender), 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${packname},;;;\nFN:${packname},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg'), thumbnail: fs.readFileSync('./media/thumbnail.jpg'),sendEphemeral: true}}}
		
		// fake vn
		global.fvn = {
			key: { participant : '0@s.whatsapp.net'},
			message: { 
				"audioMessage": {
					"mimetype":"audio/ogg; codecs=opus",
					"seconds": "1000000000",
					"ptt": "true"
				}
			}
		}

		// fake video
		global.fvid = {
			key: { participant : '0@s.whatsapp.net'},
			message: { "videoMessage": { "title": packname + ' - ' + author, "h": `Hmm`,'seconds': '12345', 'caption': timeh, 'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')}}
		}

		// fake centang hijau
		global.ftextt = {
			key: { participant : '0@s.whatsapp.net'},
			message: {
				"extendedTextMessage": {
					"text": packname + ' - ' + author,
					"title": timeh,
					'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')
				}
			}
		}

		// fake location
		global.fliveLoc = {
		key: { participant : '0@s.whatsapp.net'},
			message: {
				"liveLocationMessage": {
					"caption": packname + ' - ' + author,
					"h": timeh,
					'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')
				}
			}
		}

		// fake TEXT location
		global.fliveLoc2 = {
			key: { participant : '0@s.whatsapp.net'},
			message: { "liveLocationMessage": {
				"title": packname + ' - ' + author,
				"h": timeh,
				'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')
			}}
		}

		// fake toko
		global.ftoko = {
			key: { participant : '0@s.whatsapp.net'},
			message: {
				"productMessage": {
					"product": {
						"productImage": {
							"mimetype": "image/jpeg",
							"jpegThumbnail": fs.readFileSync('./media/thumbnail.jpg')
						},
						"title": packname + ' - ' + author,
						"description": timeh, 
						"currencyCode": "USD",
						"priceAmount1000": "20000000",
						"retailerId": "Ghost",
						"productImageCount": 1
					},
					"businessOwnerJid": `0@s.whatsapp.net`
				}
			}
		}

		//fake document
		global.fdocs = {
			key : { participant : '0@s.whatsapp.net'},
			message: {
				documentMessage: {
					title: packname + ' - ' + author, 
					jpegThumbnail: fs.readFileSync('./media/thumbnail.jpg')
				}
			}
		}

		// fake gif
		global.fgif = {
			key: { participant : '0@s.whatsapp.net'},
			message: { 
				"videoMessage": {
					"title": packname + ' - ' + author,
					"h": `Hmm`,
					'seconds': '999999999', 
					'gifPlayback': 'true', 
					'caption': timeh,
					'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')
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
					itemCount : 723,
					//status: 1,
					//surface : 1,
					message: packname + ' - ' + author,
					//orderTitle: `anulah`,
					thumbnail: fs.readFileSync('./media/anime.jpg'),
					sellerJid: '0@s.whatsapp.net' 
				}
			}
		}
	}
}

export default handler 

function ucapan() {
	const time = moment.tz('Asia/Jakarta').format('HH')
	let res = "Selamat malam 🌙"
	if (time >= 4) {
		res = "Selamat pagi 🌄"
	}
	if (time > 10) {
		res = "Selamat siang ☀️"
	}
	if (time >= 15) {
		res = "Selamat sore 🌅"
	}
	if (time >= 18) {
		res = "Selamat malam 🌙"
	}
	return res
}