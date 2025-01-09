import axios from 'axios'
import got from 'got'
import * as cheerio from 'cheerio'
import request from 'request'
import yts from 'yt-search'
import { Aksara } from './aksara.js'
import { _token, headers } from './func.js'
import { sizeFormatter } from 'human-readable'
import { z } from 'zod'
import {
	YoutubeSearchArgsSchema,
	YoutubeSearchResponseSchema,
	YoutubeSearchSchema
} from './youtube-search/index.js'

const DEFAULT_HEADERS = {
	'accept': '*/*',
	'accept-encoding': 'gzip, deflate, br',
	'accept-language': 'en-US,en;q=0.9',
	'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
	'sec-ch-ua-mobile': '?0',
	'sec-fetch-dest': 'empty',
	'sec-fetch-mode': 'cors',
	'sec-fetch-site': 'same-origin',
	'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
}

function aksaraToLatin(str, options = { HVokal: false }) {
	const aksara = new Aksara(str, options);
	const AksaraToLatinSchema = z.string()
	return AksaraToLatinSchema.parse(aksara.toLatin());
}

function latinToAksara(str, options = { mode: 'ketik', space: true }) {
	const aksara = new Aksara(str, options);
	const LatinToAksaraSchema = z.string()
	return LatinToAksaraSchema.parse(aksara.toAksara());
}

async function artimimpi(mimpi) {
	var _a, _b, _c, _d, _e;
	const ArtiMimpiSchema = z.string()
	const data = await got(`https://www.primbon.com/tafsir_mimpi.php?mimpi=${mimpi}&submit=+Submit+`).text();
	const results = (_e = (_d = (_c = (_b = (_a = data
		.split('</i></b><br><br>')[1]) === null || _a === void 0 ? void 0 : _a.split('<!-- AWAL IN-ARTICLE ADV -->')[0]) === null || _b === void 0 ? void 0 : _b.replace(/<(\/)?font( color=#ff0000)?>/gi, '')) === null || _c === void 0 ? void 0 : _c.trim()) === null || _d === void 0 ? void 0 : _d.split('<br><br>')) === null || _e === void 0 ? void 0 : _e.filter((v) => v);
	return (results || []).map((value) => ArtiMimpiSchema.parse(value));
}

async function cerpen(category) {
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

async function chord(query) {
	try {
		const glink = await axios.get(`https://www.gitagram.com/?s=${query}`)
		const plink = cheerio.load(glink.data)('#content').find('tbody > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)').attr('href')
		if (plink == undefined) return ({
			status: false,
			message: 'Chord not found!'
		})
		const { data } = await axios.get(plink)
		const $ = cheerio.load(data)
		const result = {
			status: 200,
			title: $('article > div > header > h1').text(),
			artist: $('article > div > header > div > a:nth-child(2) > span').text(),
			chord: $('article > div > div.content > pre').text().trim()
		}
		return result
	} catch (e) {
		return e
	}
}

const dongeng = {
	list: async () => {
		let nextPageUrl = 'https://www.1000dongeng.com/';
		const posts = [];
		try {
			while (nextPageUrl) {
				const { data } = await axios.get(nextPageUrl);
				const $ = cheerio.load(data);
				
				$('.date-outer .date-posts .post-outer').each((index, element) => {
					const title = $(element).find('.post-title a').text();
					const link = $(element).find('.post-title a').attr('href');
					const author = $(element).find('.post-author .fn').text().trim();
					const date = $(element).find('.post-timestamp .published').text();
					const image = $(element).find('.post-thumbnail amp-img').attr('src') || 'Image not available';
	 
					posts.push({
						title,
						link,
						author,
						date,
						image
					});
				});
	 
				const nextLink = $('.blog-pager-older-link').attr('href');
				nextPageUrl = nextLink ? nextLink : null;
			}
			return {
				total: posts.length,
				posts
			}
		} catch (error) {
			console.error('Error fetching the website:', error);
		}
	},
	getDongeng: async (url) => {
		try {
			const { data } = await axios.get(url);
			const $ = cheerio.load(data);
			const title = $('h1.post-title.entry-title').text().trim();
			const author = $('.post-author .fn').text().trim();
			const storyContent = $('.superarticle').find('div').map((i, el) => {
				return $(el).text().trim();
			}).get().join('\n');
			return { 
				title, 
				author, 
				storyContent
			};
		} catch (error) {
			console.error('Error fetching the website:', error);
		}
	}
}

async function GDriveDl(url) {
	const formatSize = sizeFormatter({
		std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
	})
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
				'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
				'x-drive-first-party': 'DriveWebUi',
				'x-json-requested': 'true' ,
				...headers
			}
		})
		let { fileName, sizeBytes, downloadUrl } = JSON.parse((await res.text()).slice(4))
		if (!downloadUrl) throw 'Link Download Limit!'
		let data = await fetch(downloadUrl)
		if (data.status !== 200) return data.statusText
		return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') }
	} catch (e) {
		console.log(e)
		return res
	}
}


async function googleImage(query) {
	const GoogleImageSchema = z.string().url()
	const data = await got(`https://www.google.com/search?q=${query}&tbm=isch`, {
		headers: DEFAULT_HEADERS
	}).text();
	const $ = cheerio.load(data);
	const pattern = /\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm;
	const matches = $.html().matchAll(pattern);
	const decodeUrl = (url) => decodeURIComponent(JSON.parse(`"${url}"`));
	return [...matches]
		.map(({ groups }) => decodeUrl(groups === null || groups === void 0 ? void 0 : groups.url))
		.filter((v) => /.*\.jpe?g|png$/gi.test(v))
		.map((value) => GoogleImageSchema.parse(value));
}

function joox(query) {
	return new Promise((resolve, reject) => {
		const time = Math.floor(new Date() / 1000)
		axios.get('http://api.joox.com/web-fcgi-bin//web_search?lang=id&country=id&type=0&search_input=' + query + '&pn=1&sin=0&ein=29&_=' + time)
			.then(({ data }) => {
				let result = []
				let hasil = []
				let promoses = []
				let ids = []
				data.itemlist.forEach(result => {
					ids.push(result.songid)
				});
				for (let i = 0; i < data.itemlist.length; i++) {
					const get = 'http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=' + ids[i]
					promoses.push(
						axios.get(get, {
							headers: {
								Cookie: 'wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;'
							}
						})
							.then(({ data }) => {
								const res = JSON.parse(data.replace('MusicInfoCallback(', '').replace('\n)', ''))
								hasil.push({
									lagu: res.msong,
									album: res.malbum,
									penyanyi: res.msinger,
									publish: res.public_time,
									img: res.imgSrc,
									mp3: res.mp3Url
								})
								Promise.all(promoses).then(() => resolve({
									creator: "ariffb",
									status: true,
									data: hasil,
								}))
							}).catch(reject)
					)
				}
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

function lirik(judul) {
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

async function neonimeEpisode(url) {
	return new Promise(async(resolve) => {
		const {data} = await axios.get(url)
		const $ = cheerio.load(data)
		const result = {}
		$('#info > div').each(function() {
			let param = $(this).find('b').text().replace(/ /g, '_').toLowerCase()
			if(param) result[param] = $(this).find('span').text()
		})
		result.thumbnail = $('#fixar > div.imagen').find('a > img').attr('data-src')
		result.download = {}
		$('#series > div.ladoB > div.central > div > ul > ul').each(function() {
			$(this).find('li').each(function(a, b) {
				$(b).find('a').each(function() {
					let name = $(b).find('label').text().replace(/ /g, '_').toLowerCase().trim()
					if(Object.keys(result.download).length <= 10) result.download[name] ? result.download[name] : result.download[name] = { type: $(b).find('label').text() }
					result.download[name][$(this).text().toLowerCase().trim()] = $(this).attr('href')
				})
			})
		})
		resolve(result)
	})
}

async function neonimeSearch(query, pop = 'ink', page = 1) {
	return new Promise(async(resolve) => {
		try {
			const { data } = await axios.get(`https://neonime.${pop}/page/${page}/?s=${query}`)
			const $ = cheerio.load(data)
			const result = []
			$('#contenedor').find('div.item_1.items > div').each(function(){
				result.push({
					title: $(this).find('a > div > span').text(),
					episode: $(this).find('div.fixyear > h2').text(),
					thumbnail: $(this).find('a > img').attr('data-src') || $(this).find('a > div > img').attr('data-src'),
					url: decodeURIComponent($(this).find('a').attr('href'))
				})
			})
			const filter = result.filter(p => p.thumbnail)
			resolve(filter != '' ? {
				status: true,
				query,
				page,
				result: filter
			} : {
				status: false,
				query,
				page,
				message: 'not found'
			})
		} catch (e) {
			resolve({
				status: 404,
				query,
				page,
				message: 'Page not found!'
			})
		}
	})
}

async function neonimeTvshow(url) {
	return new Promise(async(resolve) => {
		const {data} = await axios.get(url)
		const $ = cheerio.load(data)
		const result = {}
		$('#info > div').each(function() {
			let param = $(this).find('b').text().replace(/ /g, '_').toLowerCase()
			if(param) result[param] = $(this).find('span').text()
		})
		result.thumbnail = $('#fixar > div.imagen').find('img').attr('data-src')
		result.episodes = []
		$('#seasons > div > div.se-a').each(function() {
			$(this).find('li').each(function(a, b) {
				$(b).find('a').each(function() {
					result.episodes.push({ title: $(this).text().trim(), link: $(this).attr('href') })
				})
			})
		})
		resolve(result)
	})
}

function pindl(url) {
	return new Promise(async (resolve, reject) => {
		let form = new URLSearchParams()
		form.append('url', url)
		let html = await (await fetch('https://pinterestvideodownloader.com/', { method: 'POST', body: form })).text()
		$ = cheerio.load(html)
		let data = []
		$('table > tbody > tr').each(function (i, e) {
			if ($($(e).find('td')[0]).text() != '') data.push({
				url: $($(e).find('td')[0]).find('a').attr('href')
			})
		})
		if (data.length == 0) return resolve({ status: false })
		resolve({ status: true, data })
	})
}

function pinterest(query) {
	return new Promise((resolve, reject) => {
	 axios(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`).then((data) => {
			resolve(
				data.data.resource_response.data.results.map(v => ({
					id: v.id,
					title: v.title,
					image: v.images?.orig?.url || '',
					source: v.link || ''
				}
			)).filter(v => v.image))
		}).catch(reject)
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
				const link = 'https://play.google.com' + $(b).attr('href')
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

class Primbon {

	constructor({base_url} = {}) {
		this.base_url = base_url || "https://primbon.com/"
	}

	async tafsir_mimpi(value) {
		return new Promise((resolve, reject) => {
			axios.get('https://primbon.com/tafsir_mimpi.php?mimpi='+value+'&submit=+Submit+')
			.then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							mimpi: value,
							arti: fetchText.split(`Hasil pencarian untuk kata kunci: ${value}`)[1].split('\n')[0],
							solusi: fetchText.split('Solusi -')[1].trim()
						}
					}
				} catch {
					hasil = {
						status: false,
						message: `Tidak ditemukan tafsir mimpi "${value}" Cari dengan kata kunci yang lain.`
					}
				}
				resolve(hasil)
			})
		})
	}

	async ramalan_jodoh(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'ramalan_jodoh.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "nama1": nama1, "tgl1": tgl1, "bln1": bln1, "thn1": thn1, "nama2": nama2, "tgl2": tgl2, "bln2": bln2, "thn2": thn2, "submit": "  RAMALAN JODOH »  " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							nama_anda: {
								nama: nama1,
								tgl_lahir: fetchText.split('Tgl. Lahir: ')[1].split(nama2)[0]
							},
							nama_pasangan: {
								nama: nama2,
								tgl_lahir: fetchText.split(nama2)[1].split('Tgl. Lahir: ')[1].split('Dibawah')[0]
							},
							result: fetchText.split('begitu pula sebaliknya.')[1].split('Konsultasi Hari Baik Akad Nikah >>>')[0].trim(),
							catatan: 'Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan Ramalan Jodoh (Jawa), numerologi Kecocokan Cinta, tingkat keserasian Nama Pasangan, Ramalan Perjalanan Hidup Suami Istri, dan makna dari Tanggal Jadian/Pernikahan.'
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

	async ramalan_jodoh_bali(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'ramalan_jodoh_bali.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "nama1": nama1, "tgl1": tgl1, "bln1": bln1, "thn1": thn1, "nama2": nama2, "tgl2": tgl2, "bln2": bln2, "thn2": thn2, "submit": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							nama_anda: {
								nama: nama1,
								tgl_lahir: fetchText.split('Hari Lahir: ')[1].split('Nama')[0]
							},
							nama_pasangan: {
								nama: nama2,
								tgl_lahir: fetchText.split(nama2+'Hari Lahir: ')[1].split('HASILNYA MENURUT PAL SRI SEDANAI')[0]
							},
							result: fetchText.split('HASILNYA MENURUT PAL SRI SEDANAI. ')[1].split('Konsultasi Hari Baik Akad Nikah >>>')[0],
							catatan: 'Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan Ramalan Jodoh (Jawa), numerologi Kecocokan Cinta, tingkat keserasian Nama Pasangan, Ramalan Perjalanan Hidup Suami Istri, dan makna dari Tanggal Jadian/Pernikahan.'
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

	async suami_istri(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'suami_istri.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "nama1": nama1, "tgl1": tgl1, "bln1": bln1, "thn1": thn1, "nama2": nama2, "tgl2": tgl2, "bln2": bln2, "thn2": thn2, "submit": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							suami: {
								nama: nama1,
								tgl_lahir: fetchText.split('Tgl. Lahir: ')[1].split(nama2)[0]
							},
							istri: {
								nama: nama2,
								tgl_lahir: fetchText.split(nama2+'Tgl. Lahir: ')[1].split('HASIL RAMALAN MENURUT USIA PERNIKAHAN')[0]
							},
							result: fetchText.split('HASIL RAMALAN MENURUT USIA PERNIKAHAN')[1].split('Konsultasi Hari Baik Akad Nikah >>>')[0],
							catatan: 'Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan Ramalan Jodoh (Jawa), Ramalan Jodoh (Bali), numerologi Kecocokan Cinta, tingkat keserasian Nama Pasangan, dan makna dari Tanggal Jadian/Pernikahan.'
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

	async ramalan_cinta(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'ramalan_cinta.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "nama1": nama1, "tanggal1": tgl1, "bulan1": bln1, "tahun1": thn1, "nama2": nama2, "tanggal2": tgl2, "bulan2": bln2, "tahun2": thn2, "submit": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							nama_anda: {
								nama: nama1,
								tgl_lahir: fetchText.split('Tgl. Lahir : ')[1].split(nama2)[0]
							},
							nama_pasangan: {
								nama: nama2,
								tgl_lahir: fetchText.split(nama2+'Tgl. Lahir : ')[1].split('Sisi Positif')[0]
							},
							sisi_positif: fetchText.split('Sisi Positif Anda: ')[1].split('Sisi Negatif Anda:')[0],
							sisi_negatif: fetchText.split('Sisi Negatif Anda: ')[1].split('< Hitung Kembali')[0].trim(),
							catatan: 'Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan primbon Ramalan Jodoh (Jawa), Ramalan Jodoh (Bali), tingkat keserasian Nama Pasangan, Ramalan Perjalanan Hidup Suami Istri, dan makna dari Tanggal Jadian/Pernikahan.'
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

	async arti_nama(value) {
		return new Promise((resolve, reject) => {
			axios.get('https://primbon.com/arti_nama.php?nama1='+value+'&proses=+Submit%21+')
			.then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil 
				try {
					hasil = {
						status: true,
						message: {
							nama: value,
							arti: fetchText.split('memiliki arti: ')[1].split('Nama:')[0].trim(),
							catatan: 'Gunakan juga aplikasi numerologi Kecocokan Nama, untuk melihat sejauh mana keselarasan nama anda dengan diri anda.'
						}
					}
				} catch {
					hasil = {
						status: false,
						message: `Tidak ditemukan arti nama "${value}" Cari dengan kata kunci yang lain.`
					}
				}
				resolve(hasil)
			})
		})
	}

	async kecocokan_nama(nama, tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'kecocokan_nama.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "nama": nama, "tgl": tgl, "bln": bln, "thn": thn, "kirim": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							nama: nama,
							tgl_lahir: fetchText.split('Tgl. Lahir: ')[1].split('\n')[0],
							life_path: fetchText.split('Life Path Number : ')[1].split('\n')[0],
							destiny: fetchText.split('Destiny Number : ')[1].split('\n')[0],
							destiny_desire: fetchText.split("Heart's Desire Number : ")[1].split('\n')[0],
							personality: fetchText.split('Personality Number : ')[1].split('\n')[0],
							persentase_kecocokan: fetchText.split('PERSENTASE KECOCOKAN')[1].split('< Hitung Kembali')[0].trim(),
							catatan: 'Gunakan juga aplikasi numerologi Arti Nama, untuk melihat arti dan karakter dari nama anda.'
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

	async kecocokan_nama_pasangan(nama1, nama2) {
		return new Promise((resolve, reject) => {
			axios.get('https://primbon.com/kecocokan_nama_pasangan.php?nama1='+nama1+'&nama2='+nama2+'&proses=+Submit%21+')
			.then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $("#body").text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							nama_anda: nama1,
							nama_pasangan: nama2,
							sisi_positif: fetchText.split('Sisi Positif Anda: ')[1].split('Sisi Negatif Anda: ')[0],
							sisi_negatif: fetchText.split('Sisi Negatif Anda: ')[1].split('< Hitung Kembali')[0],
							gambar: 'https://primbon.com/ramalan_kecocokan_cinta2.png',
							catatan:'Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan primbon Ramalan Jodoh (Jawa), Ramalan Jodoh (Bali), numerologi Kecocokan Cinta, Ramalan Perjalanan Hidup Suami Istri, dan makna dari Tanggal Jadian/Pernikahan.'
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

	async ramalan_nasib(tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'ramalan_nasib.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "tanggal": tgl, "bulan": bln, "tahun": thn, "hitung": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil= {
						status: true,
						message: {
							analisa: fetchText.split('RAMALAN NASIB (METODE PITAGORAS)')[1].split('Angka Akar ')[0].trim(),
							angka_akar: fetchText.split('Angka Akar ')[1].split('Anda')[0],
							sifat: 'Anda Adalah Orang yang'+ fetchText.split('Anda adalah orang yang')[1].split('Dalam numerologi Pitagoras,')[0],
							elemen: 'Dalam numerologi Pitagoras'+fetchText.split('Dalam numerologi Pitagoras')[1].split('Angka Kombinasi')[0].trim(),
							angka_keberuntungan: 'Angka Kombinasi'+fetchText.split('Angka Kombinasi')[1].split('Tgl. Lahir')[0].trim(),
							catatan: 'Gunakan juga aplikasi ramalan dengan Kartu Tarot, Tarot Cinta, Kartu Lenormand , ramalan Peruntungan sepanjang tahun. Cari solusi atau nasehat dari masalah anda melalui hexagram I Ching.'
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

	async cek_potensi_penyakit(tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'cek_potensi_penyakit.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "tanggal": tgl, "bulan": bln, "tahun": thn, "hitung": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							analisa: fetchText.split('CEK POTENSI PENYAKIT (METODE PITAGORAS)')[1].split('Sektor yg dianalisa:')[0].trim(),
							sektor: fetchText.split('Sektor yg dianalisa:')[1].split('Anda tidak memiliki elemen')[0].trim(),
							elemen: 'Anda tidak memiliki elemen '+fetchText.split('Anda tidak memiliki elemen')[1].split('*')[0].trim(),
							catatan: 'Potensi penyakit harus dipandang secara positif. Sakit pada daftar tidak berarti anda akan mengalami semuanya. Anda mungkin hanya akan mengalami 1 atau 2 macam penyakit. Pencegahan adalah yang terbaik, makanan yang sehat, olahraga teratur, istirahat yang cukup, hidup bahagia, adalah resep paling manjur untuk menghindari segala penyakit.'
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

	async arti_kartu_tarot(tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'arti_kartu_tarot.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "tgl": tgl, "bln": bln, "thn": thn, "kirim": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							tgl_lahir: fetchText.split('Tgl. Lahir ')[1].split(', memiliki')[0],
							simbol_tarot: fetchText.split('memiliki simbol tarot:')[1].split('Kartu tarot')[0],
							image: 'https://primbon.com/'+$('#body').find('img').attr('src'),
							arti: fetchText.split('Kartu tarot')[1].split('< Hitung Kembali')[0],
							catatan: fetchText.split('< Hitung Kembali')[1].trim()
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

	async perhitungan_feng_shui(nama, gender, tahun) {
		/**
		 * value nama isi sesuai namamu
		 * value gender "1" untuk laki-laki & "2" umtuk perempuan
		 * value tahun isi sesuai tahun lahirmu
		 */
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'perhitungan_feng_shui.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "nama": nama, "gender": gender, "tahun": tahun, "submit": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							nama: fetchText.split('Nama: ')[1].split('Thn. Lahir: ')[0],
							tahun_lahir: fetchText.split('Thn. Lahir: ')[1].split('Jns. Kelamin: ')[0],
							jenis_kelamin: fetchText.split('Jns. Kelamin: ')[1].split('Angka Kua Anda: ')[0],
							angka_kua: fetchText.split('Angka Kua Anda: ')[1].split('Anda termasuk kelompok')[0],
							kelompok: fetchText.split('Anda termasuk kelompok')[1].split('Orang dalam kelompok ini mempunyai karakter:')[0],
							karakter: fetchText.split('Orang dalam kelompok ini mempunyai karakter: ')[1].split('SEKTOR/ARAH BAIK')[0].trim(),
							sektor_baik: fetchText.split('SEKTOR/ARAH BAIK')[1].split('SEKTOR/ARAH BURUK')[0],
							sektor_buruk: fetchText.split('SEKTOR/ARAH BURUK')[1].split('< Hitung Kembali')[0]
						}
					}
				} catch {
					hasil = {
						status: true,
						message: 'Error, Mungkin Input Yang Anda Masukkan Salah'
					}
				}
				resolve(hasil)
			})
		})
	}

	async petung_hari_baik(tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'petung_hari_baik.php',
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
							tgl_lahir: fetchText.split('Watak Hari Menurut Kamarokam')[1].split('Kala Tinantang:')[0],
							kala_tinantang: fetchText.split('Kala Tinantang: ')[1].split('< Hitung Kembali')[0].trim(),
							info: 'Dalam kitab Primbon dituliskan bahwa setiap hari memiliki karakter atau watak yang berbeda-beda. Dengan mengetahui watak hari tersebut, kita dapat menentukan kapan hari atau saat yang tepat untuk melaksanakan suatu hal atau kegiatan sehingga dapat tercapai tujuan yang kita harapkan. Salah satu cara untuk menentukan watak hari baik/buruk adalah berdasarkan Petung Kamarokam. Petung Kamarokam sebenarnya adalah perpaduan Petung Pancasuda Asli dengan Petung Pancasuda Pakuwon yang sudah disaring dan diringkas intisarinya.',
							catatan: 'Untuk mencari hari baik berbagai keperluan, dapat dikombinasikan dengan primbon Hari Larangan dan primbon Hari Naas. Sedangkan untuk mencari hari baik Akad Nikah diperlukan perhitungan secara khusus, prosedurnya dapat dilihat disini.'
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

	async hari_sangar_taliwangke(tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'hari_sangar_taliwangke.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "tgl": tgl, "bln": bln, "thn": thn, "kirim": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							tgl_lahir: fetchText.split('Primbon Hari Larangan (Tanggal Sangar, Bangas Padewan, Taliwangke)')[1].split('Termasuk hari BIASA')[0],
							result: 'Termasuk hari BIASA'+fetchText.split('Termasuk hari BIASA')[1].split('Untuk mengetahui watak hari, masukkan:')[0],
							info: fetchText.split('*')[1].split('Catatan:')[0],
							catatan: 'Untuk mencari hari baik berbagai keperluan, dapat dikombinasikan dengan primbon Hari Baik dan primbon Hari Naas. Sedangkan untuk mencari hari baik Akad Nikah diperlukan perhitungan secara khusus, prosedurnya dapat dilihat disini.'
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

	async primbon_hari_naas(tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'primbon_hari_naas.php',
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
							hari_lahir: fetchText.split('Hari Lahir Anda: ')[1].split(',')[0],
							tgl_lahir: fetchText.split('Tgl. ')[1].split('Hari Naas Anda:')[0],
							hari_naas: fetchText.split('Hari Naas Anda: ')[1].split('Catatan:')[0],
							catatan: fetchText.split('Catatan: ')[1].split('< Hitung Kembali')[0],
							info: 'Pada dasarnya setiap orang yang dilahirkan selalu membawa takdir positif dan takdir negatif. Takdir positif seperti misalnya sehat, sukses, rejeki, dll. Sedangkan takdir negatif seperti misalnya sakit, musibah, kematian, dll. Primbon Hari Naas itu sendiri adalah "Ilmu Titen" yang diwariskan oleh leluhur kita  dari tanah Jawa secara turun temurun, yang niteni atau mempelajari bahwa ternyata ada hubungan antara weton hari lahir dengan weton hari naas seseorang. Primbon Hari Naas ini tidak dimaksudkan untuk menakut-nakuti kita, tetapi lebih diharapkan supaya kita jadi lebih waspada akan adanya takdir negatif yang dapat menimpa kita. Pada hari itu, sebaiknya kita menghindari perjalanan jauh ataupun mengadakan acara-acara penting, serta memperbanyak doa dan sedekah.'
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

	async rahasia_naga_hari(tgl,bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'rahasia_naga_hari.php',
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
							hari_lahir: fetchText.split('RAHASIA NAGA HARI')[1].split(',')[0],
							tgl_lahir: fetchText.split('Tgl. ')[1].split('Naga Hari berada di')[0],
							arah_naga_hari: fetchText.split('Naga Hari berada di ')[1].split('< Hitung Kembali')[0],
							catatan: fetchText.split('< Hitung Kembali')[1].trim()
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

	async primbon_arah_rejeki(tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'primbon_arah_rejeki.php',
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
							hari_lahir: fetchText.split('MENURUT PRIMBON GAYATRI:')[1].split(',')[0],
							tgl_lahir: fetchText.split('Tgl. ')[1].split('Rejeki berada di ')[0],
							arah_rejeki: fetchText.split('Rejeki berada di ')[1].split('< Hitung Kembali')[0],
							catatan: fetchText.split('< Hitung Kembali')[1].trim()
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

	async ramalan_peruntungan(nama, tgl, bln, thn, untuk) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'ramalan_peruntungan.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "nama1": nama, "tgl1": tgl, "bln1": bln, "thn1": thn, "thn2": untuk, "submit": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							nama: nama,
							tgl_lahir: fetchText.split('Tgl. Lahir : ')[1].split('PERUNTUNGAN ANDA DI TAHUN')[0],
							peruntungan_tahun: untuk,
							result: fetchText.split(`PERUNTUNGAN ANDA DI TAHUN ${untuk}`)[1].split('< Hitung Kembali')[0],
							catatan: fetchText.split('Catatan: ')[1].trim()
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

	async weton_jawa(tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'weton_jawa.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "tgl": tgl, "bln": bln, "thn": thn, "submit": "  WETON JAWA »  " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							tanggal: fetchText.split('Tanggal: ')[1].split('Jumlah Neptu')[0],
							jumlah_neptu: fetchText.split('Jumlah Neptu')[1].split('Watak Hari (Kamarokam)')[0],
							watak_hari: fetchText.split('Watak Hari (Kamarokam)')[1].split('Naga Hari')[0],
							naga_hari: fetchText.split('.Naga Hari')[1].split('Jam Baik (Saptawara & Pancawara)')[0],
							jam_baik: fetchText.split('Jam Baik (Saptawara & Pancawara)')[1].split('Watak Kelahiran')[0],
							watak_kelahiran: fetchText.split('Watak Kelahiran')[1].split('< Hitung Kembali')[0]
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

	async sifat_karakter_tanggal_lahir(nama, tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'sifat_karakter_tanggal_lahir.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "nama": nama, "tanggal": tgl, "bulan": bln, "tahun": thn, "submit": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							nama: nama,
							tgl_lahir: fetchText.split('Tgl. Lahir : ')[1].split('GARIS HIDUP')[0],
							garis_hidup: fetchText.split('GARIS HIDUP')[1].split('< Hitung Kembali')[0]
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

	async potensi_keberuntungan(nama, tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'potensi_keberuntungan.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "nama": nama, "tanggal": tgl, "bulan": bln, "tahun": thn, "submit": " Submit! " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							nama: nama,
							tgl_lahir: fetchText.split('Tgl. Lahir : ')[1].split('Setiap orang')[0],
							result: 'Setiap orang'+fetchText.split('Setiap orang')[1].split('< Hitung Kembali')[0]
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

	async primbon_memancing_ikan(tgl, bln, thn) {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'primbon_memancing_ikan.php',
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
							tgl_mancing: fetchText.split('PRIMBON MEMANCING IKAN')[1].split('Maka hasilnya: ')[0].trim(),
							result: fetchText.split('Maka hasilnya: ')[1].split('< Hitung Kembali')[0],
							catatan: fetchText.split('< Hitung Kembali')[1].trim()
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

	async masa_subur(dateday, datemonth, dateyear, siklus = "28") {
		return new Promise((resolve, reject) => {
			axios({
				url: this.base_url+'masa_subur.php',
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: new URLSearchParams(Object.entries({ "dateday": dateday, "datemonth": datemonth, "dateyear": dateyear, "days": siklus, "calculator_ok": " Submit " }))
			}).then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText = $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							result: fetchText.split('KALKULATOR MASA SUBUR')[1].split('Menentukan Ovulasi & Masa Subur')[0].trim(),
							catatan: 'Menentukan Ovulasi & Masa Subur\n'+fetchText.split('Menentukan Ovulasi & Masa Subur')[1].trim()
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

	async zodiak(zodiak) {
		return new Promise((resolve, reject) => {
			axios.get(`https://primbon.com/zodiak/${zodiak}.htm`)
			.then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText =$('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: {
							zodiak: fetchText.split('Nomor Keberuntungan:')[0].trim(),
							nomor_keberuntungan: fetchText.split('Nomor Keberuntungan: ')[1].split('\n')[0],
							aroma_keberuntungan: fetchText.split('Aroma Keberuntungan: ')[1].split('\n')[0],
							planet_yang_mengitari: fetchText.split('Planet Yang Mengitari: ')[1].split('\n')[0],
							bunga_keberuntungan: fetchText.split('Bunga Keberuntungan: ')[1].split('\n')[0],
							warna_keberuntungan: fetchText.split('Warna Keberuntungan: ')[1].split('\n')[0],
							batu_keberuntungan: fetchText.split('Batu Keberuntungan: ')[1].split('\n')[0],
							elemen_keberuntungan:fetchText.split('Elemen Keberuntungan: ')[1].split('\n')[0],
							pasangan_zodiak: fetchText.split('Pasangan Serasi: ')[1].split('\n')[0],
							catatan: fetchText.split('\n\n\n\n\n\n\n\n\n\n\n')[1].split('<<< Kembali')[0].trim()
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

	async shio(shio) {
		return new Promise((resolve, reject) => {
			axios.get(`https://primbon.com/shio/${shio}.htm`)
			.then(({ data }) => {
				let $ = cheerio.load(data)
				let fetchText= $('#body').text()
				let hasil
				try {
					hasil = {
						status: true,
						message: fetchText.split('<<< Kembali')[0].trim()
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

function quotes(input) {
	return new Promise((resolve, reject) => {
		fetch('https://jagokata.com/kata-bijak/kata-' + input.replace(/\s/g, '_') + '.html?page=1')
			.then(res => res.text())
			.then(res => {
				const $ = cheerio.load(res)
				data = []
				$('div[id="main"]').find('ul[id="citatenrijen"] > li').each(function (index, element) {
					x = $(this).find('div[class="citatenlijst-auteur"] > a').text().trim()
					y = $(this).find('span[class="auteur-beschrijving"]').text().trim()
					z = $(element).find('q[class="fbquote"]').text().trim()
					data.push({ author: x, bio: y, quote: z })
				})
				data.splice(2, 1)
				if (data.length == 0) return resolve({ creator: 'stikerin', status: false })
				resolve({ creator: 'stikerin', status: true, data })
			}).catch(reject)
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

function ssweb(url, device = 'desktop') {
	return new Promise((resolve, reject) => {
		let result
		const base = 'https://www.screenshotmachine.com'
		const param = {
			url: url,
			device: device,
			cacheLimit: 0
		}
		axios({
			url: base + '/capture.php',
			method: 'POST',
			data: new URLSearchParams(Object.entries(param)),
			headers: {
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		})
		.then((data) => {
			const cookies = data.headers['set-cookie']
			if (data.data.status == 'success') {
			axios.get(base + '/' + data.data.link, {
				headers: {
				'cookie': cookies.join('')
				},
				responseType: 'arraybuffer'
			})
			.then(({ data }) => {
				result = {
				status: 200,
				result: data
				}
				resolve(result)
			})
			} else {
			reject({
				status: 404,
				message: data.data
			})
			}
		})
		.catch (reject)
	})
}

async function stickerLine(query) {
	const StickerLineSchema = z.object({
		id: z.string(),
		title: z.string(),
		description: z.string().optional().nullable(),
		url: z.string().url(),
		sticker: z.string(),
		stickerAnimated: z.string().optional().nullable(),
		stickerSound: z.string().optional().nullable(),
		authorId: z.string(),
		authorName: z.string()
	})
	const data = await got(`https://store.line.me/api/search/sticker?query=${query}&offset=0&limit=36&type=ALL&includeFacets=true`).json();
	return data.items.map(({ title, productUrl, id, description, payloadForProduct: { staticUrl, animationUrl, soundUrl }, authorId, authorName }) => {
		return StickerLineSchema.parse({
			id,
			title,
			description,
			url: encodeURI('https://store.line.me' + productUrl),
			sticker: staticUrl,
			stickerAnimated: animationUrl,
			stickerSound: soundUrl,
			authorId,
			authorName
		});
	});
}

async function stickerTelegram(query, page) {
	const StickerTelegramSchema = z.object({
		title: z.string(),
		icon: z.string(),
		link: z.string().url(),
		stickers: z.array(z.string().url())
	})
	const data = await got(`https://combot.org/stickers?q=${encodeURI(query)}&page=${page || 1}`, {
		headers: {
			...DEFAULT_HEADERS,
			'user-agent': 'PostmanRuntime/7.39.1' // prevent forbidden
		}
	}).text();
	const $ = cheerio.load(data);
	const results = [];
	$('body > div > main > div.page > div > div.stickers-catalogue > div.tab-content > div > div').each(function () {
		var _a;
		const title = (_a = $(this).find('.sticker-pack__title').text()) === null || _a === void 0 ? void 0 : _a.trim();
		const icon = $(this)
			.find('.sticker-pack__sticker > div.sticker-pack__sticker-inner > div.sticker-pack__sticker-img')
			.attr('data-src');
		const link = $(this)
			.find('.sticker-pack__header > a.sticker-pack__btn')
			.attr('href');
		const stickers = [];
		$(this)
			.find('.sticker-pack__list > div.sticker-pack__sticker')
			.each(function () {
			const sticker = $(this)
				.find('.sticker-pack__sticker-inner > div.sticker-pack__sticker-img')
				.attr('data-src');
			if (sticker)
				stickers.push(sticker);
		});
		results.push({
			title,
			icon,
			link,
			stickers
		});
	});
	return results.map((value) => StickerTelegramSchema.parse(value));
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

async function soundcloud(url) {
	return new Promise((resolve, reject) => {
		axios.get('https://soundcloudmp3.org/id').then((data) => {
			let a = cheerio.load(data.data)
			let token = a('form#conversionForm > input[type=hidden]').attr('value')
			const options = {
				method: 'POST',
				url: `https://soundcloudmp3.org/converter`,
				headers: {
					"content-type": "application/x-www-form-urlencoded;",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
					"Cookie": data["headers"]["set-cookie"]
				},
				formData: {
					_token: token,
					url: url
				}
			};
			request(options, async function(error, response, body) {
				if (error) throw new Error(error)
				const $ = cheerio.load(body)
				const result = {
					status: 200,
					title: $('#preview > div:nth-child(3) > p:nth-child(2)').text().replace('Title:',''),
					duration: $('#preview > div:nth-child(3) > p:nth-child(3)').text().replace(/Length\:|Minutes/g,''),
					quality: $('#preview > div:nth-child(3) > p:nth-child(4)').text().replace('Quality:',''),
					thumbnail: $('#preview > div:nth-child(3) > img').attr('src'),
					download: $('#download-btn').attr('href')
				}
				resolve(result)
			});
		})
	})
}

function twitter(url) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams()
		params.append('URL', url)
		fetch('https://twdown.net/download.php', { method: 'POST', body: params })
			.then(res => res.text())
			.then(res => {
				const $ = cheerio.load(res);
				data = []
				$('div.container').find('tbody > tr > td').each(function (index, element) {
					x = $(this).find('a').attr('href')
					if (x !== '#') {
						if (typeof x !== 'undefined') {
							data.push({ url: x })
						}
					}
				})
				if (data.length == 0) return resolve({ status: false })
				resolve({ status: true, data })
			}).catch(reject)
	})
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

function time2Number(time) {
	let [hours, minutes, seconds] = time.split(':').map(Number);
	if (!seconds) { // '00:07'
		[minutes, seconds] = [hours, minutes];
		hours = 0;
	}
	return hours * 3600
		+ minutes * 60
		+ seconds * 1;
}

async function youtubeSearch(query) {
	var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
	YoutubeSearchArgsSchema.parse(arguments);
	const html = await got('https://www.youtube.com/results', {
		headers: {
			...DEFAULT_HEADERS
		},
		searchParams: {
			// Append ?search_query=query
			search_query: query
		}
	}).text();
	const script = (_a = /var ytInitialData = {(.*?)};/.exec(html)) === null || _a === void 0 ? void 0 : _a[1];
	if (!script) {
		throw new Error(`Can't find script data (ytInitialData)!`);
	}
	const json = JSON.parse('{' + script + '}');
	const parsed = YoutubeSearchResponseSchema.parse(json);
	const contents = parsed.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
	const video = [];
	const channel = [];
	for (const content of contents) {
		const tag = Object.keys(content)[0];
		if (tag === 'videoRenderer') {
			const data = content[tag];
			const videoId = data.videoId;
			const url = encodeURI('https://www.youtube.com/watch?v=' + videoId);
			const title = data.title.runs.pop().text;
			const thumbnail = data.thumbnail.thumbnails.pop().url;
			const description = ((_b = data.detailedMetadataSnippets) === null || _b === void 0 ? void 0 : _b.pop().snippetText.runs.map(({ text }) => text).join('')) || '';
			const movingThumbnail = (_d = (_c = data.richThumbnail) === null || _c === void 0 ? void 0 : _c.movingThumbnailRenderer.movingThumbnailDetails.thumbnails.pop().url) !== null && _d !== void 0 ? _d : thumbnail;
			const channelName = (_f = (_e = data.longBylineText.runs[0].text) !== null && _e !== void 0 ? _e : data.longBylineText.runs[0].text) !== null && _f !== void 0 ? _f : data.shortBylineText.runs[0].text;
			const channelAvatar = data.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails.pop().url;
			const isChannelVerified = (_h = (_g = data.ownerBadges) === null || _g === void 0 ? void 0 : _g.some((badge) => {
				return badge.metadataBadgeRenderer.style === 'BADGE_STYLE_TYPE_VERIFIED';
			})) !== null && _h !== void 0 ? _h : false;
			const publishedTime = (_k = (_j = data.publishedTimeText) === null || _j === void 0 ? void 0 : _j.simpleText) !== null && _k !== void 0 ? _k : 'unknown';
			const viewH = (_p = (_m = (_l = data.viewCountText.simpleText) !== null && _l !== void 0 ? _l : data.shortViewCountText.simpleText) !== null && _m !== void 0 ? _m : (_o = data.shortViewCountText.accessibility) === null || _o === void 0 ? void 0 : _o.accessibilityData.label) !== null && _p !== void 0 ? _p : '0 views';
			const view = parseInt((_r = (_q = data.viewCountText.simpleText) === null || _q === void 0 ? void 0 : _q.replace(',', '')) !== null && _r !== void 0 ? _r : '0');
			const thumbnailOverlayTimeStatusRenderer = (_s = data.thumbnailOverlays.find((thumbnail) => {
				const key = Object.keys(thumbnail)[0];
				return key === 'thumbnailOverlayTimeStatusRenderer';
			})) === null || _s === void 0 ? void 0 : _s.thumbnailOverlayTimeStatusRenderer;
			const durationH = (_u = (_t = data.lengthText) === null || _t === void 0 ? void 0 : _t.accessibility.accessibilityData.label) !== null && _u !== void 0 ? _u : (_v = thumbnailOverlayTimeStatusRenderer === null || thumbnailOverlayTimeStatusRenderer === void 0 ? void 0 : thumbnailOverlayTimeStatusRenderer.text.accessibility) === null || _v === void 0 ? void 0 : _v.accessibilityData.label;
			const durationTime = (_w = thumbnailOverlayTimeStatusRenderer === null || thumbnailOverlayTimeStatusRenderer === void 0 ? void 0 : thumbnailOverlayTimeStatusRenderer.text.simpleText) !== null && _w !== void 0 ? _w : '00:00';
			const isShort = durationTime === 'SHORTS';
			const duration = time2Number(isShort ? '00:60' : durationTime);
			video.push({
				videoId,
				url,
				title,
				thumbnail,
				description,
				movingThumbnail,
				channelName,
				channelAvatar,
				isChannelVerified,
				publishedTime,
				viewH,
				view,
				durationH,
				duration,
			});
		}
		if (tag === 'channelRenderer') {
			const data = content[tag];
			const channelId = data.channelId;
			const username = ((_4 = (_2 = (_0 = (_y = (_x = data.longBylineText.runs.pop()) === null || _x === void 0 ? void 0 : _x.navigationEndpoint.browseEndpoint.canonicalBaseUrl) !== null && _y !== void 0 ? _y : (_z = data.longBylineText.runs.pop()) === null || _z === void 0 ? void 0 : _z.navigationEndpoint.commandMetadata.webCommandMetadata.url) !== null && _0 !== void 0 ? _0 : (_1 = data.shortBylineText.runs.pop()) === null || _1 === void 0 ? void 0 : _1.navigationEndpoint.browseEndpoint.canonicalBaseUrl) !== null && _2 !== void 0 ? _2 : (_3 = data.shortBylineText.runs.pop()) === null || _3 === void 0 ? void 0 : _3.navigationEndpoint.commandMetadata.webCommandMetadata.url) !== null && _4 !== void 0 ? _4 : data.subscriberCountText.simpleText).replace(/^\//, '');
			const channelName = (_5 = data.title.text) !== null && _5 !== void 0 ? _5 : username;
			const url = encodeURI('https://www.youtube.com/' + username);
			const avatarUrl = data.thumbnail.thumbnails.pop().url;
			const avatar = encodeURI('https:' + avatarUrl);
			const isChannelVerified = (_7 = (_6 = data.ownerBadges) === null || _6 === void 0 ? void 0 : _6.some((badge) => {
				return badge.metadataBadgeRenderer.style === 'BADGE_STYLE_TYPE_VERIFIED';
			})) !== null && _7 !== void 0 ? _7 : false;
			const subscriberH = data.videoCountText.simpleText;
			// const subscriber = 
			const description = data.descriptionSnippet.runs.map(({ text }) => text).join('');
			channel.push({
				channelId,
				url,
				channelName,
				username,
				avatar,
				isChannelVerified,
				subscriberH,
				// TODO: Add subscriber wich is number of subscriber
				description
			});
		}
	}
	return YoutubeSearchSchema.parse({
		video,
		channel
	});
}

function parseDuration(s) {
	const h = Math.floor(s / 3600);
	const m = Math.floor(s / 60) % 60;
	s = Math.floor(s) % 60;
	return [h, m, s].map(v => v.toString().padStart(2, "0")).join(":");
}

async function ytdl(link) {
	const { data } = await axios.post("https://www.yt1s.com/api/ajaxSearch/index", new URLSearchParams({
		q: link,
		vt: "home"
	}), {
		headers
	});
	const result = {
		title: data.title,
		duration: parseDuration(data.t),
		author: data.a
	}
	const resultUrl = {
		video: Object.values(data.links.mp4),
		audio: Object.values(data.links.mp3)
	};
	for(const i in resultUrl) resultUrl[i] = resultUrl[i].map(v => ({
		size: v.size,
		format: v.f,
		quality: v.q,
		download: download.bind({}, data.vid, v.k)
	})).sort((a, b) => (a.quality.slice(0, -1)*1) - (b.quality.slice(0, -1)*1));


	return {
		result,
		resultUrl
	};
}

async function download(id, k) {
	const { data } = await axios.post("https://www.yt1s.com/api/ajaxConvert/convert", new URLSearchParams({
		vid: id,
		k
	}), {
		headers
	});
	return data.dlink;
}

async function ytdl2(url) {
	return new Promise(async (resolve) => {
		try {
			if (
				!url.match(/https:\/\/(www\.)?youtube\.com\/watch\?v=.*/i) &&
				!url.match(/https:\/\/(www\.)?youtube\.com\/shorts\/.*/i) &&
				!url.match(/https:\/\/(www\.)?youtube\.com\/embed\/.*/i) &&
				!url.match(/https:\/\/(www\.)?youtube\.com\/v\/.*/i) &&
				!url.match(/https:\/\/youtu\.be\/.*/i) &&
				!url.match(/https:\/\/(www\.)?youtube\.com\/playlist\?list=.*/i)
			)
			return resolve({
				status: false,
				msg: `Invalid Youtube URL!`,
			});

			const data = await axios.get(`https://nayan-video-downloader.vercel.app/ytdown?url=${url}`, {
				headers
			});
			resolve(data.data);
		} catch (error) {
			resolve({
				status: false,
				msg: error.message || 'YouTube API error',
			});
		}
	});
};

export {
	aksaraToLatin,
	latinToAksara,
	artimimpi,
	cerpen,
	chord,
	dongeng,
	GDriveDl,
	googleImage,
	joox,
	linkwa,
	lirik,
	neonimeEpisode,
	neonimeSearch,
	neonimeTvshow,
	pindl,
	pinterest,
	playstore,
	Primbon,
	quotes,
	quotesAnime,
	ssweb,
	stickerLine,
	stickerTelegram,
	styletext,
	soundcloud,
	twitter,
	wikimedia,
	youtubeSearch,
	ytdl,
	ytdl2
}