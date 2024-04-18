// @ts-check
import * as os from 'os'
import chalk from 'chalk'
import db, { loadDatabase } from './database.js'
import fs from 'fs'
import Helper from './helper.js'
import importFile from './import.js'
import open from 'open'
import P from 'pino'
import path, { resolve } from 'path'
import readline from 'readline'
import storeSystem from './store.js'
import { fileURLToPath } from 'url'
import { HelperConnection } from './simple.js'

/** @type {import('@whiskeysockets/baileys')} */
// @ts-ignore
const {
	default: makeWASocket,
	DisconnectReason,
	fetchLatestBaileysVersion,
	PHONENUMBER_MCC,
	useMultiFileAuthState
} = (await import('@whiskeysockets/baileys')).default

const Device = (os.platform() === 'win32') ? 'Windows' : (os.platform() === 'darwin') ? 'MacOS' : 'Linux'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const authFolder = storeSystem.fixFileName(`${Helper.opts._[0] || ''}sessions`)
const authFile = `${Helper.opts._[0] || 'session'}.data.json`
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
const usePairingCode = Helper.opts['pairing']
const useMobile = Helper.opts['mobile']

let [
	isCredsExist,
	isAuthSingleFileExist,
	authState
] = await Promise.all([
	Helper.checkFileExists(authFolder + '/creds.json'),
	Helper.checkFileExists(authFile),
	useMultiFileAuthState(authFolder)
])

const store = storeSystem.makeInMemoryStore()
const storeFile = `${Helper.opts._[0] || 'data'}.store.json`
store.readFromFile(storeFile)

// from: https://github.com/whiskeysockets/baileys/blob/master/src/Utils/logger.ts
const logger = P({
	timestamp: () => `,"time":"${new Date().toJSON()}"`,
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true
		}
	}
}).child({ class: 'baileys' })

/** @type {import('@whiskeysockets/baileys').UserFacingSocketConfig} */
const connectionOptions = {
	printQRInTerminal: !usePairingCode,
	mobile: useMobile,
	syncFullHistory: false,
	auth: authState.state
}

/** 
 * @typedef {{ 
 *  handler?: typeof import('../handler').handler; 
 *  participantsUpdate?: typeof import('../handler').participantsUpdate; 
 *  groupsUpdate?: typeof import('../handler').groupsUpdate; 
 *  onDelete?:typeof import('../handler').deleteUpdate; 
 *  connectionUpdate?: (update: import('@adiwajshing/baileys').BaileysEventMap<unknown>['connection.update']) => any; 
 *  credsUpdate?: () => void 
 * }} EventHandlers
 * @typedef {Required<import('@whiskeysockets/baileys').UserFacingSocketConfig>['logger']} Logger
 * @typedef {ReturnType<typeof makeWASocket> & EventHandlers & { 
 *  isInit?: boolean; 
 *  isReloadInit?: boolean; 
 *  msgqueque?: import('./queque').default;
 *  logger?: Logger
 * }} Socket 
 * @typedef {{ 
 *  handler?: Promise<typeof import('../handler')> | typeof import('../handler'); 
 *  isChild?: boolean; 
 *  connectionOptions?: Partial<import('@adiwajshing/baileys').UserFacingSocketConfig>; 
 *  logger?: Logger;
 *  store: typeof store;
 *  authState: Awaited<ReturnType<typeof useMultiFileAuthState>>
 * }} StartOptions
 */


/** @type {Map<string, Socket>} */
let conns = new Map();
/** 
 * @param {Socket?} oldSocket 
 * @param {StartOptions} opts
 */
async function start(oldSocket = null, opts = { store, logger, authState }) {
	/** @type {Socket} */
	let { version, isLatest } = await fetchLatestBaileysVersion()
	console.log(chalk.magenta(`-- using WA v${version.join('.')}, isLatest: ${isLatest} --`))
	let conn = await makeWASocket({
		version,
		...connectionOptions,
		...opts.connectionOptions,
		logger: opts.logger,
		auth: opts.authState.state,
		generateHighQualityLinkPreview: true,
		defaultQueryTimeoutMs: undefined, // issues https://github.com/WhiskeySockets/Baileys/issues/276
		browser: [Device, 'Chrome', '20.0.04']
	})
	HelperConnection(conn, { store: opts.store, logger })

	if (oldSocket) {
		conn.isInit = oldSocket.isInit
		conn.isReloadInit = oldSocket.isReloadInit
	}
	if (conn.isInit == null) {
		conn.isInit = false
		conn.isReloadInit = true
	}

	store.bind(conn.ev, {
		groupMetadata: conn.groupMetadata
	})
	if((usePairingCode || useMobile) && isCredsExist && !conn.authState.creds.registered) {
		console.log(chalk.yellow('-- WARNING: creds.json is broken, please delete it first --'))
		process.exit(0)
	}
	if(usePairingCode && !conn.authState.creds.registered) {
		if(useMobile) throw new Error('Cannot use pairing code with mobile api')
		const { registration } = { registration: {} }
		let phoneNumber = ''
		do {
			phoneNumber = await question(chalk.blueBright('ENTER A VALID NUMBER START WITH REGION CODE. Example : 62xxx:\n'))
		} while (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v)))
		rl.close()
		phoneNumber = phoneNumber.replace(/\D/g,'')
		console.log(chalk.bgWhite(chalk.blue('-- Please wait, generating code... --')))
		setTimeout(async () => {
			let code = await conn.requestPairingCode(phoneNumber)
			code = code?.match(/.{1,4}/g)?.join('-') || code
			console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
		}, 3000)
	}

	// not tested yet
	if(useMobile && !conn.authState.creds.registered) {
		if(usePairingCode) throw new Error('Cannot use mobile api with pairing code')
		const { registration } = { registration: {} }

		if(!registration.phoneNumber) {
			registration.phoneNumber = await question(chalk.blueBright('ENTER A VALID NUMBER START WITH REGION CODE. Example : 62xxx:\n'))
		}

		const libPhonenumber = await import('libphonenumber-js')
		const phoneNumber = libPhonenumber.parsePhoneNumber(registration.phoneNumber || '')
		if(!phoneNumber?.isValid()) {
			throw new Error('Invalid phone number: ' + registration.phoneNumber)
		}

		registration.phoneNumber = phoneNumber.format('E.164')
		registration.phoneNumberCountryCode = phoneNumber.countryCallingCode
		registration.phoneNumberNationalNumber = phoneNumber.nationalNumber
		const mcc = PHONENUMBER_MCC[phoneNumber.countryCallingCode]
		if(!mcc) {
			throw new Error('Could not find MCC for phone number: ' + registration.phoneNumber + '\nPlease specify the MCC manually.')
		}

		registration.phoneNumberMobileCountryCode = mcc

		async function enterCode() {
			try {
				const code = await question(chalk.blueBright('Please enter the one time code:\n'))
				const response = await conn.register(code.replace(/["']/g, '').trim().toLowerCase())
				console.log('Successfully registered your phone number.')
				console.log(response)
				rl.close()
			} catch(error) {
				console.error('Failed to register your phone number. Please try again.\n', error)
				await askForOTP()
			}
		}

		async function enterCaptcha() {
			const response = await conn.requestRegistrationCode({ ...registration, method: 'captcha' })
			const captcha = path.join(__dirname, `../tmp/captcha.png`)
			fs.writeFileSync(captcha, Buffer.from(response.image_blob, 'base64'))

			await open(captcha)
			const code = await question(chalk.blueBright('Please enter the captcha code:\n'))
			fs.unlinkSync(captcha)
			registration.captcha = code.replace(/["']/g, '').trim().toLowerCase()
		}

		async function askForOTP() {
			if (!registration.method) {
				let code = await question(chalk.blueBright('How would you like to receive the one time code for registration ?\ntype "sms" or "voice"\n'))
				code = code.replace(/["']/g, '').trim().toLowerCase()
				if(code !== 'sms' && code !== 'voice') {
					return await askForOTP()
				}

				registration.method = code
			}

			try {
				await conn.requestRegistrationCode(registration)
				await enterCode()
			} catch(error) {
				console.error('Failed to request registration code. Please try again.\n', error)

				if(error?.reason === 'code_checkpoint') {
					await enterCaptcha()
				}

				await askForOTP()
			}
		}

		askForOTP()
	}

	await reload(conn, false, opts).then((success) => console.log('- bind handler event -', success))

	return conn
}


let OldHandler = null
/** 
 * @param {Socket} conn 
 * @param {boolean} restartConnection
 * @param {StartOptions} opts
 */
async function reload(conn, restartConnection, opts = { store, logger, authState }) {
	if (!opts.handler) opts.handler = importFile(Helper.__filename(resolve('./handler.js'))).catch(console.error)
	if (opts.handler instanceof Promise) opts.handler = await opts.handler;
	if (!opts.handler && OldHandler) opts.handler = OldHandler
	OldHandler = opts.handler
	// const isInit = !!conn.isInit
	const isReloadInit = !!conn.isReloadInit
	if (restartConnection) {
		try { conn.ws.close() } catch { }
		// @ts-ignore
		conn.ev.removeAllListeners()
		Object.assign(conn, await start(conn, opts) || {})
	}

	// Assign message like welcome, bye, etc.. to the connection
	Object.assign(conn, getMessageConfig())

	if (!isReloadInit) {
		if (conn.handler) conn.ev.off('messages.upsert', conn.handler)
		if (conn.participantsUpdate) conn.ev.off('group-participants.update', conn.participantsUpdate)
		if (conn.groupsUpdate) conn.ev.off('groups.update', conn.groupsUpdate)
		if (conn.onDelete) conn.ev.off('messages.delete', conn.onDelete)
		if (conn.connectionUpdate) conn.ev.off('connection.update', conn.connectionUpdate)
		if (conn.credsUpdate) conn.ev.off('creds.update', conn.credsUpdate)
	}
	if (opts.handler) {
		conn.handler = /** @type {typeof import('../handler')} */(opts.handler).handler.bind(conn)
		conn.participantsUpdate = /** @type {typeof import('../handler')} */(opts.handler).participantsUpdate.bind(conn)
		conn.groupsUpdate = /** @type {typeof import('../handler')} */(opts.handler).groupsUpdate.bind(conn)
		conn.onDelete = /** @type {typeof import('../handler')} */(opts.handler).deleteUpdate.bind(conn)
	}
	if (!opts.isChild) conn.connectionUpdate = connectionUpdate.bind(conn, opts)
	conn.credsUpdate = opts.authState.saveCreds.bind(conn)

	/** @typedef {Required<EventHandlers>} Event */
	conn.ev.on('messages.upsert', /** @type {Event} */(conn).handler)
	conn.ev.on('group-participants.update', /** @type {Event} */(conn).participantsUpdate)
	conn.ev.on('groups.update', /** @type {Event} */(conn).groupsUpdate)
	conn.ev.on('messages.delete', /** @type {Event} */(conn).onDelete)
	if (!opts.isChild) conn.ev.on('connection.update', /** @type {Event} */(conn).connectionUpdate)
	conn.ev.on('creds.update', /** @type {Event} */(conn).credsUpdate)

	conn.isReloadInit = false
	return true

}
 
/**
 * @this {Socket}
 * @param {StartOptions} opts
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['connection.update']} update
 */
async function connectionUpdate(opts, update) {
	const { connection, lastDisconnect, isNewLogin } = update
	// @ts-ignore
	//const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
	const code = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
	if (connection === 'close') {
		if (code) {
			/*console.log('- Connection Closed, Reconnecting -')
			await reload(this, true, opts).catch(console.error)
			global.timestamp.connect = new Date*/
			try {
				console.log('- Connection Closed, Reconnecting -')
				await reload(this, true, opts)
				global.timestamp.connect = new Date
			} catch (e) {
				console.log('-- ERROR LOG --')
				console.log(e)
			}
		} else {
			console.log(chalk.red('-- Device loggedOut --'))
			process.exit(0)
		}
	} else if (connection == 'open') console.log('- opened connection -')
	if (db.data == null) loadDatabase()
}

function getMessageConfig() {
	const welcome = 'Hai, @user!\nSelamat datang di grup @subject\n\n@desc'
	const bye = 'Selamat tinggal @user!'
	const spromote = '@user sekarang admin!'
	const sdemote = '@user sekarang bukan admin!'
	const sDesc = 'Deskripsi telah diubah ke \n@desc'
	const sSubject = 'Judul grup telah diubah ke \n@subject'
	const sIcon = 'Icon grup telah diubah!'
	const sRevoke = 'Link group telah diubah ke \n@revoke'

	return {
		welcome,
		bye,
		spromote,
		sdemote,
		sDesc,
		sSubject,
		sIcon,
		sRevoke
	}
}

const conn = start(null, { store, logger, authState })
	.catch(console.error)


export default {
	start,
	reload,

	conn,
	conns,
	logger,
	connectionOptions,

	authFolder,
	storeFile,
	authState,
	store,

	getMessageConfig
}
export {
	conn,
	conns,
	logger
}
