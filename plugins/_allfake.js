import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'

let handler = m => m
	handler.all = async function (m) {
	let name = await this.getName(m.sender)
	let pp = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
	let sgc = `https://i.postimg.cc/CM34YRFb/photo-2021-02-05-10-13-39.jpg`
	let d = new Date(new Date + 3600000)
	let locale = 'id'
	let timeh = `🕰️ ${d.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' }).replaceAll('.',':')}`
	try {
		pp = await this.profilePictureUrl(m.sender, 'image')
	} catch (e) {
	} finally {
		global.doc = pickRandom(["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/pdf"])

		// Module
		const _uptime = process.uptime() * 1000

		// Ini untuk command crator/owner
		global.kontak2 = [
		[owner[0], await this.getName(owner[0] + '@s.whatsapp.net'), 'ᴅᴇᴠᴇʟᴏᴩᴇʀ ʙᴏᴛ', 'azamimylaifu@gmail.com', true],
		[owner[1], await this.getName(owner[1] + '@s.whatsapp.net'), 'ᴅᴇᴠᴇʟᴏᴩᴇʀ ʙᴏᴛ', 'hidorimylaifu@gmail.com', true], // Kalo mau di tambah tinggal copy 1baris ini di tempel di bawahnya trs di edit dikit!
		]

		// ucapan ini mah
		global.ucapan = ucapan()

		// pesan sementara
		global.ephemeral = '86400' // 86400 = 24jam, kalo ingin di hilangkan ganti '86400' jadi 'null' atau ''

		// externalAdReply atau text with thumbnail. gatau bahasa Inggris? coba translate!
		global.adReply = {
			contextInfo: {
				forwardingScore: 9999,
				//isForwarded: true, // ini biar ada diteruskan, jika ingin di hilangkan ganti true menjadi false
				externalAdReply: { // Bagian ini sesuka kalian berkreasi :'v
					showAdAttribution: true,
					title: global.ucapan,
					body: "Hallo " + name,
					mediaUrl: sgc,
					description: timeh,
					previewType: "PHOTO",
					thumbnail: await (await fetch(pp)).buffer(),
					sourceUrl: "https://github.com/AyGemuy",					
				}
			}
		}
		global.fakeig = {
			contextInfo: { externalAdReply: { showAdAttribution: true,
				mediaUrl: "https://Instagram.com/wudysoft.2",
				mediaType: "VIDEO",
				description: "https://Instagram.com/wudysoft.2",
				title: author,
				body: timeh,
				thumbnailUrl: pp,
				sourceUrl: sgc
				}
			}
		}
		// Fake 🤥
		global.ftroli = { key: {participant : '0@s.whatsapp.net'}, message: { orderMessage: { itemCount: 2022, status: 1, surface: 1, message: timeh, orderTitle: author, sellerJid: '0@s.whatsapp.net' } } }
		global.fkontak = { key: {participant : '0@s.whatsapp.net'}, message: { 'contactMessage': { 'displayName': this.getName(m.sender), 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${packname},;;;\nFN:${packname},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg'), thumbnail: fs.readFileSync('./media/thumbnail.jpg'),sendEphemeral: true}}}
		global.fvn = {
			key: { participant : '0@s.whatsapp.net'},
			message: { 
				"audioMessage": {
					"mimetype":"audio/ogg; codecs=opus",
					"seconds": "999999999999",
					"ptt": "true"
				}
			}
		}
		global.fvid = {
			key: { participant : '0@s.whatsapp.net'},
			message: { "videoMessage": { "title":author, "h": `Hmm`,'seconds': '99999', 'caption': timeh, 'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')}}
		}


		global.ftextt = {
			key: { participant : '0@s.whatsapp.net'},
			message: {
				"extendedTextMessage": {
					"text":author,
					"title": timeh,
					'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')
				}
			}
		}

		global.fliveLoc = {
		key: { participant : '0@s.whatsapp.net'},
			message: {
				"liveLocationMessage": {
					"caption": author,
					"h": `${timeh}`,
					'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')
				}
			}
		}

		global.fliveLoc2 = {
			key: { participant : '0@s.whatsapp.net'},
			message: { "liveLocationMessage": {
				"title": author,
				"h": timeh,
				'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')
			}}
		}

		global.ftoko = {
			key: { participant : '0@s.whatsapp.net'},
			message: {
				"productMessage": {
					"product": {
						"productImage": {
							"mimetype": "image/jpeg",
							"jpegThumbnail": fs.readFileSync('./media/thumbnail.jpg') //Gambarnye
						},
						"title": author, //Kasih namalu 
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

		global.fdocs = {
			key : { participant : '0@s.whatsapp.net'},
			message: {
				documentMessage: {
					title: author, 
					jpegThumbnail: fs.readFileSync('./media/thumbnail.jpg')
				}
			}
		}

		global.fgclink = {
			key: { participant : '0@s.whatsapp.net'},
			message: {
				groupInviteMessage: {
					groupJid: "17608914335-1625305606@g.us",
					inviteCode: null,
					groupName: author, 
					caption: timeh, 
					jpegThumbnail: fs.readFileSync('./media/thumbnail.jpg')
				}
			}
		}

		global.fgif = {
			key: { participant : '0@s.whatsapp.net'},
			message: { 
				"videoMessage": {
					"title": author,
					"h": `Hmm`,
					'seconds': '999999999', 
					'gifPlayback': 'true', 
					'caption': timeh,
					'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')
				}
			}
		}

		global.ftrol = {
			key : {
			participant : '0@s.whatsapp.net'
			},
			message: {
				orderMessage: {
					itemCount : 3,
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

function pickRandom(list) {
	return list[Math.floor(list.length * Math.random())]
}
