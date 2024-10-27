import axios from 'axios'

export default async (link) => {
	const response = await fetch("https://www.yt1s.com/api/ajaxSearch/index", {
		method: "POST",
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0",
			"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
			"Content-Type": "application/x-www-form-urlencoded",
			"Referer": "https://www.yt1s.com/",
			"Origin": "https://www.yt1s.com"
		},
		body: new URLSearchParams({
			q: link,
			vt: "home"
		})
	});

	if (!response.ok) {
		console.error(`Error: Received status ${response.status}`);
		const text = await response.text();
		console.error(text);
		return;
	}

	const contentType = response.headers.get('content-type');
	if (!contentType || !contentType.includes('application/json')) {
		console.error('Error: Expected JSON response but received', contentType);
		const text = await response.text();
		console.error(text);
		return;
	}

	const data = await response.json();

	const result = {
		title: data.title,
		duration: parseDuration(data.t),
		author: data.a
	};

	const resultUrl = {
		video: Object.values(data.links.mp4),
		audio: Object.values(data.links.mp3)
	};

	for (const i in resultUrl) {
		resultUrl[i] = resultUrl[i].map(v => ({
			size: v.size,
			format: v.f,
			quality: v.q,
			download: download.bind({}, data.vid, v.k)
		})).sort((a, b) => (a.quality.slice(0, -1) * 1) - (b.quality.slice(0, -1) * 1));
	}

	// Kembalikan hasilnya
	return {
		result,
		resultUrl
	};
}

async function download(id, k) {
	const response = await fetch("https://www.yt1s.com/api/ajaxConvert/convert", {
		method: "POST",
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0",
			"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
			"Content-Type": "application/x-www-form-urlencoded",
			"Referer": "https://www.yt1s.com/",
			"Origin": "https://www.yt1s.com",
		},
		body: new URLSearchParams({
			vid: id,
			k
		})
	});

	const data = await response.json();
	return data.dlink;
}

function parseDuration(s) {
	const h = Math.floor(s / 3600);
	const m = Math.floor(s / 60) % 60;
	s = Math.floor(s) % 60;
	return [h, m, s].map(v => v.toString().padStart(2, "0")).join(":");
}