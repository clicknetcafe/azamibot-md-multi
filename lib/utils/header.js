function generateRandomUserAgent() {
	const Versi = [
			"4.0.3",
			"4.1.1",
			"4.2.2",
			"4.3",
			"4.4",
			"5.0.2",
			"5.1",
			"6.0",
			"7.0",
			"8.0",
			"9.0",
			"10.0",
			"11.0",
		],
		TypeP = [
			"M2004J19C",
			"S2020X3",
			"Xiaomi4S",
			"RedmiNote9",
			"SamsungS21",
			"GooglePixel5",
		],
		TypeC = [
			"RP1A.200720.011",
			"RP1A.210505.003",
			"RP1A.210812.016",
			"QKQ1.200114.002",
			"RQ2A.210505.003",
		],
		TypeOs = TypeP[Math.floor(Math.random() * TypeP.length)],
		TypeCB = TypeC[Math.floor(Math.random() * TypeC.length)],
		NameCType =
			"Chrome/" +
			(Math.floor(Math.random() * 80) + 1) +
			"." +
			(Math.floor(Math.random() * 999) + 1) +
			"." +
			(Math.floor(Math.random() * 9999) + 1),
		result =
			"Mozilla/5.0 (Linux; Android " +
			Versi[Math.floor(Math.random() * Versi.length)] +
			"; " +
			TypeOs +
			" Build/" +
			TypeCB +
			") AppleWebKit/537.36 (KHTML, like Gecko) " +
			NameCType +
			" Mobile Safari/537.36 WhatsApp/1." +
			(Math.floor(Math.random() * 9) + 1) +
			"." +
			(Math.floor(Math.random() * 9) + 1);
	return result;
}

function generateRandomIP() {
	const ip = () => Math.floor(Math.random() * 256);
	return ip() + "." + ip() + "." + ip() + "." + ip();
}

export default () => {
	return {
		"User-Agent": generateRandomUserAgent(),
		"X-Forwarded-For": generateRandomIP(),
	};
};

export {
	generateRandomUserAgent,
	generateRandomIP
}