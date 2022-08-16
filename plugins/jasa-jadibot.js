let handler = async (m, { conn, command }) => {
	let ini_txt = `[ ORDER NOW ]
wa.me/6282337245566

╔╣ *PREMIUM USER*
║ • Infinity Limit
║ • Akses Private Chat
╚══╣ *Harga :* Rp.10.000 / bulan

╔╣ *SEWA BOT*
║ • Dapat Premium
║ • Bebas Invit ke 1 Grup
╚══╣ *Harga :* Rp.15.000 / bulan

╔╣ *JASA RUN BOT* ${readMore}
║ • Run SC Kamu Via RDP
╚══╣ *Harga :* Rp.20.000 / bulan

╔╣ *JADI BOT*
║ • Jadi Bot Azami Always ON
║ • Bisa Req Tampilan atau Fitur
╚══╣ *Harga :* Rp.25.000 / bulan

- Pembayaran via OVO / Dana / GoPay
  ke nomor 082337245566
- Whatsapp Multi Device
- Run via RDP (Always ON)
- Request Fitur? *Langsung chat Owner.*`
	m.reply(ini_txt)
}

handler.menugroup = ['jadibot']
handler.tagsgroup = ['group']
handler.command = /^(jadibot)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)