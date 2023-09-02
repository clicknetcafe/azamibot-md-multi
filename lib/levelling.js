export const growth = Math.pow(Math.PI / Math.E, 1.618) * Math.E * .75

export function xpRange(level, multiplier = global.multiplier || 1) {
	if (level < 0)
		throw new TypeError('level cannot be negative value')
	level = Math.floor(level)
	let min = level === 0 ? 0 : Math.round(Math.pow(level, growth) * multiplier) + 1
	let max = Math.round(Math.pow(++level, growth) * multiplier)
	return {
		min,
		max,
		xp: max - min
	}
}

export function findLevel(xp, multiplier = global.multiplier || 1) {
	if (xp === Infinity)
		return Infinity
	if (isNaN(xp))
		return NaN
	if (xp <= 0)
		return -1
	let level = 0
	do
		level++
	while (xpRange(level, multiplier).min <= xp)
	return --level
}

export function canLevelUp(level, xp, multiplier = global.multiplier || 1) {
	if (level < 0)
		return false
	if (xp === Infinity)
		return true
	if (isNaN(xp))
		return false
	if (xp <= 0)
		return false
	return level < findLevel(xp, multiplier)
}

export function setRole(level) {
	let role
	try {
		if (level <= 2) role = 'Newbie ㋡'
		else if (level <= 4) role = 'Beginner Grade 1 ⚊¹'
		else if (level <= 6) role = 'Beginner Grade 2 ⚊²'
		else if (level <= 8) role = 'Beginner Grade 3 ⚊³'
		else if (level <= 10) role = 'Beginner Grade 4 ⚊⁴'
		else if (level <= 12) role = 'Private Grade 1 ⚌¹'
		else if (level <= 14) role = 'Private Grade 2 ⚌²'
		else if (level <= 16) role = 'Private Grade 3 ⚌³'
		else if (level <= 18) role = 'Private Grade 4 ⚌⁴'
		else if (level <= 20) role = 'Private Grade 5 ⚌⁵'
		else if (level <= 22) role = 'Corporal Grade 1 ☰¹'
		else if (level <= 24) role = 'Corporal Grade 2 ☰²'
		else if (level <= 26) role = 'Corporal Grade 3 ☰³'
		else if (level <= 28) role = 'Corporal Grade 4 ☰⁴'
		else if (level <= 30) role = 'Corporal Grade 5 ☰⁵'
		else if (level <= 32) role = 'Sergeant Grade 1 ≣¹'
		else if (level <= 34) role = 'Sergeant Grade 2 ≣²'
		else if (level <= 36) role = 'Sergeant Grade 3 ≣³'
		else if (level <= 38) role = 'Sergeant Grade 4 ≣⁴'
		else if (level <= 40) role = 'Sergeant Grade 5 ≣⁵'
		else if (level <= 42) role = 'Staff Grade 1 ﹀¹'
		else if (level <= 44) role = 'Staff Grade 2 ﹀²'
		else if (level <= 46) role = 'Staff Grade 3 ﹀³'
		else if (level <= 48) role = 'Staff Grade 4 ﹀⁴'
		else if (level <= 50) role = 'Staff Grade 5 ﹀⁵'
		else if (level <= 52) role = 'Sergeant Grade 1 ︾¹'
		else if (level <= 54) role = 'Sergeant Grade 2 ︾²'
		else if (level <= 56) role = 'Sergeant Grade 3 ︾³'
		else if (level <= 58) role = 'Sergeant Grade 4 ︾⁴'
		else if (level <= 60) role = 'Sergeant Grade 5 ︾⁵'
		else if (level <= 62) role = '2nd Lt. Grade 1 ♢¹ '
		else if (level <= 64) role = '2nd Lt. Grade 2 ♢²'
		else if (level <= 66) role = '2nd Lt. Grade 3 ♢³'
		else if (level <= 68) role = '2nd Lt. Grade 4 ♢⁴'
		else if (level <= 70) role = '2nd Lt. Grade 5 ♢⁵'
		else if (level <= 72) role = '1st Lt. Grade 1 ♢♢¹'
		else if (level <= 74) role = '1st Lt. Grade 2 ♢♢²'
		else if (level <= 76) role = '1st Lt. Grade 3 ♢♢³'
		else if (level <= 78) role = '1st Lt. Grade 4 ♢♢⁴'
		else if (level <= 80) role = '1st Lt. Grade 5 ♢♢⁵'
		else if (level <= 82) role = 'Major Grade 1 ✷¹'
		else if (level <= 84) role = 'Major Grade 2 ✷²'
		else if (level <= 86) role = 'Major Grade 3 ✷³'
		else if (level <= 88) role = 'Major Grade 4 ✷⁴'
		else if (level <= 90) role = 'Major Grade 5 ✷⁵'
		else if (level <= 92) role = 'Colonel Grade 1 ✷✷¹'
		else if (level <= 94) role = 'Colonel Grade 2 ✷✷²'
		else if (level <= 96) role = 'Colonel Grade 3 ✷✷³'
		else if (level <= 98) role = 'Colonel Grade 4 ✷✷⁴'
		else if (level <= 100) role = 'Colonel Grade 5 ✷✷⁵'
		else if (level <= 102) role = 'Brigadier Early ✰'
		else if (level <= 104) role = 'Brigadier Silver ✩'
		else if (level <= 106) role = 'Brigadier gold ✯'
		else if (level <= 108) role = 'Brigadier Platinum ✬'
		else if (level <= 110) role = 'Brigadier Diamond ✪'
		else if (level <= 112) role = 'Major General Early ✰'
		else if (level <= 114) role = 'Major General Silver ✩'
		else if (level <= 116) role = 'Major General gold ✯'
		else if (level <= 118) role = 'Major General Platinum ✬'
		else if (level <= 120) role = 'Major General Diamond ✪'
		else if (level <= 122) role = 'Lt. General Early ✰'
		else if (level <= 124) role = 'Lt. General Silver ✩'
		else if (level <= 126) role = 'Lt. General gold ✯'
		else if (level <= 128) role = 'Lt. General Platinum ✬'
		else if (level <= 130) role = 'Lt. General Diamond ✪'
		else if (level <= 132) role = 'General Early ✰'
		else if (level <= 134) role = 'General Silver ✩'
		else if (level <= 136) role = 'General gold ✯'
		else if (level <= 138) role = 'General Platinum ✬'
		else if (level <= 140) role = 'General Diamond ✪'
		else if (level <= 142) role = 'Commander Early ★'
		else if (level <= 144) role = 'Commander Intermediate ⍣'
		else if (level <= 146) role = 'Commander Elite ≛'
		else if (level <= 148) role = 'The Commander Hero ⍟'
		else if (level <= 152) role = 'Legends 忍'
		else if (level <= 154) role = 'Legends 忍'
		else if (level <= 156) role = 'Legends 忍'
		else if (level <= 158) role = 'Legends 忍'
		else if (level <= 160) role = 'Legends 忍'
		else if (level <= 162) role = 'Legends 忍'
		else if (level <= 164) role = 'Legends 忍'
		else if (level <= 166) role = 'Legends 忍'
		else if (level <= 168) role = 'Legends 忍'
		else if (level <= 170) role = 'Legends 忍'
		else if (level <= 172) role = 'Legends 忍'
		else if (level <= 174) role = 'Legends 忍'
		else if (level <= 176) role = 'Legends 忍'
		else if (level <= 178) role = 'Legends 忍'
		else if (level <= 180) role = 'Legends 忍'
		else if (level <= 182) role = 'Legends 忍'
		else if (level <= 184) role = 'Legends 忍'
		else if (level <= 186) role = 'Legends 忍'
		else if (level <= 188) role = 'Legends 忍'
		else if (level <= 190) role = 'Legends 忍'
		else if (level <= 192) role = 'Legends 忍'
		else if (level <= 194) role = 'Legends 忍'
		else if (level <= 196) role = 'Legends 忍'
		else if (level <= 198) role = 'Legends 忍'
		else if (level <= 200) role = 'Legends 忍'
		else if (level <= 210) role = 'Legends 忍'
		else if (level <= 220) role = 'Legends 忍'
		else if (level <= 230) role = 'Legends 忍'
		else if (level <= 240) role = 'Legends 忍'
		else if (level <= 250) role = 'Legends 忍'
		else if (level <= 260) role = 'Legends 忍'
		else if (level <= 270) role = 'Legends 忍'
		else if (level <= 280) role = 'Legends 忍'
		else if (level <= 290) role = 'Legends 忍'
		else if (level <= 300) role = 'Legends 忍'
		else if (level <= 310) role = 'Legends 忍'
		else if (level <= 320) role = 'Legends 忍'
		else if (level <= 330) role = 'Legends 忍'
		else if (level <= 340) role = 'Legends 忍'
		else if (level <= 350) role = 'Legends 忍'
		else if (level <= 360) role = 'Legends 忍'
		else if (level <= 370) role = 'Legends 忍'
		else if (level <= 380) role = 'Legends 忍'
		else if (level <= 390) role = 'Legends 忍'
		else if (level <= 400) role = 'Legends 忍'
		else if (level <= 410) role = 'Legends 忍'
		else if (level <= 420) role = 'Legends 忍'
		else if (level <= 430) role = 'Legends 忍'
		else if (level <= 440) role = 'Legends 忍'
		else if (level <= 450) role = 'Legends 忍'
		else if (level <= 460) role = 'Legends 忍'
		else if (level <= 470) role = 'Legends 忍'
		else if (level <= 480) role = 'Legends 忍'
		else if (level <= 490) role = 'Legends 忍'
		else if (level <= 500) role = 'Legends 忍'
		else if (level <= 600) role = 'Legends 忍'
		else if (level <= 700) role = 'Legends 忍'
		else if (level <= 800) role = 'Legends 忍'
		else if (level <= 900) role = 'Legends 忍'
		else if (level <= 1000) role = 'Legends 忍'
		else if (level <= 2000) role = 'Legends 忍'
		else if (level <= 3000) role = 'Legends 忍'
		else if (level <= 4000) role = 'Legends 忍'
		else if (level <= 5000) role = 'Legends 忍'
		else if (level <= 6000) role = 'Legends 忍'
		else if (level <= 7000) role = 'Legends 忍'
		else if (level <= 8000) role = 'Legends 忍'
		else if (level <= 9000) role = 'Legends 忍'
		else if (level <= 10000) role = 'Legends 忍'
		return role
	} catch (e) {
		console.log(e)
		return 'invalid level user'
	}
}