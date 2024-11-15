import db from '../../lib/database.js';

export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.key.remoteJid != 'status@broadcast') return !1;
    if (!db.data.users[m.sender].viewstatus) return !1;
    let txt = `*Status From : @${m.sender.split('@')[0]}*${m.text ? `\n\n${m.text}` : ''}`;
    for (let x of db.data.datas.rowner.map(([number]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')) {
        try {
            if (m.mtype === 'textMessage' || m.mtype === 'extendedTextMessage') {
                // Status Teks only
                await this.reply(x, txt, fkontak, { mentions: [m.sender] });
            } else if (m.mtype !== 'protocolMessage') {
                // Status Media (status voice blm coba)
                let buffer = await m.download();
                if (buffer && buffer.length > 0) {
                    console.log(`Ngecek status buffer size: ${buffer.length}`);
                    await this.sendFile(x, buffer, '', txt, null, false, { mentions: [m.sender], quoted: fkontak });
                } else {
                    console.log('buffer kosongan');
                    await this.reply(x, txt, fkontak, { mentions: [m.sender] });
                }
            } else {
                console.log('Protocol msg, status delete mungkin?');
            }
        } catch (e) {
            console.log(e);
            await this.reply(x, txt, fkontak, { mentions: [m.sender] });
        }
    }
    return !0;
}
