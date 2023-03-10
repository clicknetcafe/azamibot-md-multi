import Jimp from 'jimp'
import { sizeFormatter } from 'human-readable'
import axios from 'axios'
import cheerio from 'cheerio'

function ranNumb(min, max = null) {
	if (max !== null) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} else {
		return Math.floor(Math.random() * min) + 1
	}
}

function padLead(num, size) {
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}
	 
function niceBytes(x) {
	let units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(x, 10) || 0;
	while(n >= 1024 && ++l){
		n = n/1024;
	}
	return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function isNumber(number) {
	if (!number) return number
	number = parseInt(number)
	return typeof number == 'number' && !isNaN(number)
}

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

function runtimes(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + "d " : "";
	var hDisplay = h < 10 ? "0" + h + ":" : h > 0 ? h + ":" : "";
	var mDisplay = m < 10 ? "0" + m + ":" : m > 0 ? m + ":" : "";
	var sDisplay = s < 10 ? "0" + s : s > 0 ? s : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

async function cerpen (category) {
	return new Promise(async (resolve, reject) => {
		let title = category.toLowerCase().replace(/[()*]/g, "")
		let length, judul = title.replace(/\s/g, "-")
		try {
			let res = await axios.get('http://cerpenmu.com/category/cerpen-'+judul)
			let $ = await cheerio.load(res.data)
			length = $('html body div#wrap div#content article.post div.wp-pagenavi a')
			length = length['4'].attribs.href.split('/').pop()
		} catch { length = 0 }
		let page = Math.floor(Math.random() * parseInt(length))
		axios.get('http://cerpenmu.com/category/cerpen-'+judul+'/page/'+page)
		.then((get) => {
			let $ = cheerio.load(get.data)
			let link = []
			$('article.post').each(function (a, b) {
				link.push($(b).find('a').attr('href'))
			})
			let random = link[Math.floor(Math.random() * link.length)]
			axios.get(random)
			.then((res) => {
				let $$ = cheerio.load(res.data)
				let hasil = {
					title: $$('#content > article > h1').text(),
					author: $$('#content > article').text().split('Cerpen Karangan: ')[1].split('Kategori: ')[0],
					kategori: $$('#content > article').text().split('Kategori: ')[1].split('\n')[0],
					lolos: $$('#content > article').text().split('Lolos moderasi pada: ')[1].split('\n')[0],
					cerita: $$('#content > article > p').text()
				}
				resolve(hasil)
			})
		})
	})
}

function quotesAnime() {
	return new Promise((resolve, reject) => {
		const page = Math.floor(Math.random() * 188)
		axios.get('https://otakotaku.com/quote/feed/'+page)
		.then(({ data }) => {
			const $ = cheerio.load(data)
			const hasil = []
			$('div.kotodama-list').each(function(l, h) {
				hasil.push({
					link: $(h).find('a').attr('href'),
					gambar: $(h).find('img').attr('data-src'),
					karakter: $(h).find('div.char-name').text().trim(),
					anime: $(h).find('div.anime-title').text().trim(),
					episode: $(h).find('div.meta').text(),
					up_at: $(h).find('small.meta').text(),
					quotes: $(h).find('div.quote').text().trim()
				})
			})
			resolve(hasil)
		}).catch(reject)
	})
}

async function getBuffer(url, options){
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

function lirik(judul){
	return new Promise(async(resolve, reject) => {
		axios.get('https://www.musixmatch.com/search/' + judul)
		.then(async({ data }) => {
		const $ = cheerio.load(data)
		const hasil = {};
		let limk = 'https://www.musixmatch.com'
		const link = limk + $('div.media-card-body > div > h2').find('a').attr('href')
			await axios.get(link)
			.then(({ data }) => {
				const $$ = cheerio.load(data)
				hasil.thumb = 'https:' + $$('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src')
				$$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function(a,b) {
		   hasil.lirik = $$(b).find('span > p > span').text() +'\n' + $$(b).find('span > div > p > span').text()
		   })
	   })
	   resolve(hasil)
   })
   .catch(reject)
   })
}

function playstore(name){
	return new Promise((resolve, reject) => {
		axios.get('https://play.google.com/store/search?q='+ name +'&c=apps')
		.then(({ data }) => {
			const $ = cheerio.load(data)
			let ln = [];
			let nm = [];
			let dv = [];
			let lm = [];
			const result = [];
			$('div.wXUyZd > a').each(function(a,b){
				const link =  'https://play.google.com' + $(b).attr('href')
				ln.push(link);
			})
			$('div.b8cIId.ReQCgd.Q9MA7b > a > div').each(function(d,e){
				const name = $(e).text().trim()
				nm.push(name);
			})
			$('div.b8cIId.ReQCgd.KoLSrc > a > div').each(function(f,g){
				const dev = $(g).text().trim();
				dv.push(dev)
			})
			$('div.b8cIId.ReQCgd.KoLSrc > a').each(function(h,i){
				const limk = 'https://play.google.com' + $(i).attr('href');
				lm.push(limk);
			})			
		for (let i = 0; i < ln.length; i++){
			result.push({
				name: nm[i],
				link: ln[i],
				developer: dv[i],
				link_dev: lm[i]
			})
	}
		resolve(result)
		})
	.catch(reject)
	})
}

function linkwa(nama){
	return new Promise((resolve,reject) => {
		axios.get('http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search='+ nama +'&searchby=name')
		.then(({ data }) => {
			const $ = cheerio.load(data);
			const result = [];
			const lnk = [];
			const nm = [];
		$('div.wa-chat-title-container').each(function(a,b){
			const limk = $(b).find('a').attr('href');
			lnk.push(limk)
			})
		$('div.wa-chat-title-text').each(function(c,d) {
			const name = $(d).text();
			nm.push(name)
			})
		for( let i = 0; i < lnk.length; i++){
			result.push({
				nama: nm[i].split('. ')[1],
				link: lnk[i].split('?')[0]
			})
		}
		resolve(result)
		})
	.catch(reject)
	})
}

function pickRandom(list) {
	return list[Math.floor(list.length * Math.random())]
}

function generate(n) {
	var add = 1, max = 12 - add
	if ( n > max ) return generate(max) + generate(n - max)
	max        = Math.pow(10, n+add)
	var min    = max/10
	var number = Math.floor( Math.random() * (max - min + 1) ) + min
	return ('' + number).substring(add)
}

async function resize(buffer, width, height) {
	var oyy = await Jimp.read(buffer);
	var kiyomasa = await oyy.resize(width, height).getBufferAsync(Jimp.MIME_JPEG)
	return kiyomasa
}

const delay = time => new Promise(res => setTimeout(res, time))

const isUrl = (text) => {
	return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

const readMore = String.fromCharCode(8206).repeat(4001)

const someincludes = ( data, id ) => {
	let res = data.find(el => id.includes(el) )
	return res ? true : false;
}

const somematch = ( data, id ) => {
	let res = data.find(el => el === id )
	return res ? true : false;
}

const formatSize = sizeFormatter({
	std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
})

async function GDriveDl(url) {
	let id, res = { "error": true }
	if (!(url && url.match(/drive\.google/i))) return res
	try {
		id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
		if (!id) throw 'ID Not Found'
		res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
			method: 'post',
			headers: {
				'accept-encoding': 'gzip, deflate, br',
				'content-length': 0,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'origin': 'https://drive.google.com',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
				'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
				'x-drive-first-party': 'DriveWebUi',
				'x-json-requested': 'true' 
			}
		})
		let { fileName, sizeBytes, downloadUrl } =  JSON.parse((await res.text()).slice(4))
		if (!downloadUrl) throw 'Link Download Limit!'
		let data = await fetch(downloadUrl)
		if (data.status !== 200) return data.statusText
		return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') }
	} catch (e) {
		console.log(e)
		return res
	}
}

function styletext(teks) {
	return new Promise((resolve, reject) => {
		axios.get('http://qaz.wtf/u/convert.cgi?text='+teks)
		.then(({ data }) => {
			let $ = cheerio.load(data)
			let hasil = []
			$('table > tbody > tr').each(function (a, b) {
				hasil.push({ name: $(b).find('td:nth-child(1) > span').text(), result: $(b).find('td:nth-child(2)').text().trim() })
			})
			resolve(hasil)
		})
	})
}

class Primbon {

	constructor({base_url} = {}) {
		this.base_url = base_url || "https://primbon.com/"
	}

	async tanggal_jadian_pernikahan(tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios.get('https://primbon.com/tanggal_jadian_pernikahan.php?tgl='+tgl+'&bln='+bln+'&thn='+thn+'&proses=+Submit%21+')
			.then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
					   status: true,
					   message: {
							tanggal: fetchText.split('Tanggal: ')[1].split('Karakteristik: ')[0],
							karakteristik: fetchText.split('Karakteristik: ')[1].split('< Hitung Kembali')[0],
							catatan: 'Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan primbon Ramalan Jodoh (Jawa), Ramalan Jodoh (Bali), numerologi Kecocokan Cinta, tingkat keserasian Nama Pasangan, dan Ramalan Perjalanan Hidup Suami Istri.'
					   }
					}
				} catch {
					hasil = {
						status: false,
						message: 'Error, Mungkin Input Yang Anda Masukkan Salah'
					}
				}
				resolve(hasil)
			})
		})
	}

	async nomer_hoki(nomor) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'no_hoki_bagua_shuzi.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "nomer": nomor, "submit": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text().trim()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							nomer_hp: fetchText.split('No. HP : ')[1].split('\n')[0],
							angka_shuzi: fetchText.split('Angka Bagua Shuzi : ')[1].split('\n')[0],
							energi_positif: {
								kekayaan: fetchText.split('Kekayaan = ')[1].split('\n')[0],
								kesehatan: fetchText.split('Kesehatan = ')[1].split('\n')[0],
								cinta: fetchText.split('Cinta/Relasi = ')[1].split('\n')[0],
								kestabilan: fetchText.split('Kestabilan = ')[1].split('\n')[0],
								persentase: fetchText.split('%ENERGI NEGATIF')[0].split('% = ')[1]+'%'
							},
							energi_negatif: {
								perselisihan: fetchText.split('Perselisihan = ')[1].split('\n')[0],
								kehilangan: fetchText.split('Kehilangan = ')[1].split('\n')[0],
								malapetaka: fetchText.split('Malapetaka = ')[1].split('\n')[0],
								kehancuran: fetchText.split('Kehancuran = ')[1].split('\n')[0],
								persentase: fetchText.split('Kehancuran = ')[1].split('= ')[1].split('\n')[0]
							},
							catatan: fetchText.split('* ')[1].split('Masukkan Nomor HP Anda')[0]
						}
					}
				} catch {
					hasil = {
						status: false,
						message: 'ERROR! No. Handphone Tidak Valid!'
					}
				}
				resolve(hasil)
			})
		})
	}

	async rejeki_hoki_weton(tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'rejeki_hoki_weton.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "tgl": tgl, "bln": bln, "thn": thn, "submit": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							hari_lahir: fetchText.split('Hari Lahir: ')[1].split(thn)[0],
							rejeki: fetchText.split(thn)[1].split('< Hitung Kembali')[0],
							catatan: 'Rejeki itu bukan lah tentang ramalan tetapi tentang usaha dan ikhtiar seseorang. From Admin'
						}
					}
				} catch {
					hasil = {
						status: false,
						message: 'Error, Mungkin Input Yang Anda Masukkan Salah'
					}
				}
				resolve(hasil)
			})
		})
	}

	async pekerjaan_weton_lahir(tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'pekerjaan_weton_lahir.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "tgl": tgl, "bln": bln, "thn": thn, "submit": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							hari_lahir: fetchText.split('Hari Lahir: ')[1].split(thn)[0],
							pekerjaan: fetchText.split(thn)[1].split('< Hitung Kembali')[0],
							catatan: 'Setiap manusia membawa potensi bakat dan keberuntungannya sejak lahir, dengan mengetahui potensi tersebut dan menyesuaikannya dengan usaha atau pekerjaan yang dilakukan, diharapkan dapat mempermudah kita meraih kesuksesan. Para ahli primbon di tanah Jawa sejak jaman dahulu telah merumuskan jenis pekerjaan yang cocok berdasarkan weton kelahiran. Hasil perhitungannya bisa kita jadikan referensi untuk memilih pekerjaan atau bidang usaha yang cocok untuk kita.'
						}
					}
				} catch {
					hasil = {
						status: false,
						message: 'Error, Mungkin Input Yang Anda Masukkan Salah'
					}
				}
				resolve(hasil)
			})
		})
	}

	async sifat_usaha_bisnis(tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'sifat_usaha_bisnis.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "tgl": tgl, "bln": bln, "thn": thn, "submit": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							hari_lahir: fetchText.split('Hari Lahir Anda: ')[1].split(thn)[0],
							usaha: fetchText.split(thn)[1].split('< Hitung Kembali')[0],
							catatan: 'Setiap manusia memiliki sifat atau karakter yang berbeda-beda dalam menjalankan bisnis atau usaha. Dengan memahami sifat bisnis kita, rekan kita, atau bahkan kompetitor kita, akan membantu kita memperbaiki diri atau untuk menjalin hubungan kerjasama yang lebih baik. Para ahli primbon di tanah Jawa sejak jaman dahulu telah merumuskan karakter atau sifat bisnis seseorang berdasarkan weton hari kelahirannya. Hasil perhitungannya bisa dijadikan referensi untuk memilih bidang usaha atau rekan bisnis yang cocok bagi kita.'
						}
					}
				} catch {
					hasil = {
						status: false,
						message: 'Error, Mungkin Input Yang Anda Masukkan Salah'
					}
				}
				resolve(hasil)
			})
		})
	}
}

function wikimedia(title) {
	return new Promise((resolve, reject) => {
		axios.get(`https://commons.wikimedia.org/w/index.php?search=${title}&title=Special:MediaSearch&go=Go&type=image`)
		.then((res) => {
			let $ = cheerio.load(res.data)
			let hasil = []
			$('.sdms-search-results__list-wrapper > div > a').each(function (a, b) {
				hasil.push({
					title: $(b).find('img').attr('alt'),
					source: $(b).attr('href'),
					image: $(b).find('img').attr('data-src') || $(b).find('img').attr('src')
				})
			})
			resolve(hasil)
		})
	})
}

export {
	ranNumb,
	padLead,
	niceBytes,
	capitalizeFirstLetter,
	isNumber,
	runtime,
	runtimes,
	cerpen,
	quotesAnime,
	getBuffer,
	lirik,
	playstore,
	linkwa,
	pickRandom,
	generate,
	resize,
	delay,
	isUrl,
	getRandom,
	readMore,
	someincludes,
	somematch,
	GDriveDl,
	styletext,
	Primbon,
	wikimedia
}