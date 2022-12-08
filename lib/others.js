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

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const delay = time => new Promise(res => setTimeout(res, time))

const isUrl = (text) => {
	return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

const readMore = String.fromCharCode(8206).repeat(4001)

export {
	ranNumb,
	padLead,
	niceBytes,
	capitalizeFirstLetter,
	isNumber,
	runtime,
	runtimes,
	pickRandom,
	delay,
	isUrl,
	getRandom,
	readMore
}