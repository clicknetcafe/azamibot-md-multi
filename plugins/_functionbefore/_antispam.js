import db from '../../lib/database.js'

const menit = 3 // 3 = dimute 3 menit, sesuaikan aja
const SPAM_TOTALSPAM = 5; // Total Spam 
const SPAM_RESET_TIME = 30000; // Reset time di sesi spam
const MAX_MESSAGE_DELAY = 2000; // delay maksimal pesan di terimal oleh bot
const SPAM_BAN_DURATION = 60000 * menit
const spam = true
const gcspam = false
const list = ["x", "z", "X", "Z", "i", ".", "&", ","]

export async function before(m, { isPrems }) {
	if (!spam) return !1
	if (isPrems) return !1
	if (!this.spam) this.spam = {}
	if (!this.groupStatus) this.groupStatus = {}
	let user = db.data.users[m.sender];
	let chat = db.data.chats[m.chat];
	if (!user) return !1
	if (!list.some(v => m.text.startsWith(v))) return !1
	if (user.permaban || user.banned) return !1
	if ((m.chat.endsWith('broadcast') || m.fromMe) && !m.message && !chat.isBanned) return !1
	var now = new Date() * 1;
	
	const processSpam = async () => {
		if (!this.spam[m.sender] || !spam) return !1
		
		if (this.spam[m.sender].count >= SPAM_TOTALSPAM) {
			user.banned = true
			user.lastbanned = now
			user.bannedcd = SPAM_BAN_DURATION
			const banDuration = SPAM_BAN_DURATION;
			
			if (m.isGroup) {
				try {
					if (gcspam) {
						const groupId = m.chat;
						if (!this.groupStatus[groupId]) {
							this.groupStatus[groupId] = {
								isClosing: false,
								originalName: (await this.groupMetadata(groupId)).subject
							};
						}
						
						if (!this.groupStatus[groupId].isClosing) {
							this.groupStatus[groupId].isClosing = true;
							
							await this.groupSettingUpdate(groupId, 'announcement');
							await this.groupUpdateSubject(groupId, `${this.groupStatus[groupId].originalName} (SPAM)`);
							
							await this.sendMsg(groupId, { 
								text: `spam mulu.. Grup ditutup dan @${m.sender.split('@')[0]} dimute selama ${menit} menit.`,
								mentions: [m.sender]
							});
							
							setTimeout(async () => {
								try {
									await this.groupSettingUpdate(groupId, 'not_announcement');
									await this.groupUpdateSubject(groupId, this.groupStatus[groupId].originalName);
									this.groupStatus[groupId].isClosing = false;
								} catch (error) {
									console.error('Error reopening group:', error);
								}
							}, banDuration);
						}
					} else {
						await this.sendMsg(m.chat, { 
							text: `spam mulu.. @${m.sender.split('@')[0]} dimute selama ${menit} menit.`,
							mentions: [m.sender]
						});
					}
				} catch (error) {
					console.error('Error in group management:', error);
				}
			} else {
				await this.sendMsg(m.chat, {
					text: `spam mulu.. @${m.sender.split('@')[0]} dimute selama ${menit} menit.`,
					mentions: [m.sender]
				});
			}
			
			user.lastbanned = now + banDuration;
			delete this.spam[m.sender]; 
		}
	};
	
	const currentTime = m.messageTimestamp.toNumber();
	
	if (m.sender in this.spam) {
		const timeSinceLastSpam = currentTime - this.spam[m.sender].lastspam;
		
		if (timeSinceLastSpam <= MAX_MESSAGE_DELAY) {
			this.spam[m.sender].count++;
			this.spam[m.sender].lastspam = currentTime;
			
			await processSpam();
		} else {
			this.spam[m.sender] = {
				jid: m.sender,
				count: 1,
				lastspam: currentTime
			};
		}
		
		setTimeout(() => {
			if (this.spam[m.sender] && (new Date() * 1) - this.spam[m.sender].lastspam >= SPAM_RESET_TIME) {
				delete this.spam[m.sender];
			}
		}, SPAM_RESET_TIME);
	} else {
		this.spam[m.sender] = {
			jid: m.sender,
			count: 1,
			lastspam: currentTime
		};
		
		setTimeout(() => {
			if (this.spam[m.sender] && (new Date() * 1) - this.spam[m.sender].lastspam >= SPAM_RESET_TIME) {
				delete this.spam[m.sender];
			}
		}, SPAM_RESET_TIME);
	}
};