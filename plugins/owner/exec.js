import axios from 'axios'
import * as cheerio from 'cheerio'
import syntaxerror from 'syntax-error'
import { format } from 'util'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { createRequire } from 'module'
import db from '../../lib/database.js'
import connection from '../../lib/connection.js'
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)

let handler = async (m, _2) => {
	let { conn, usedPrefix, noPrefix, args, groupMetadata, participants, isMods } = _2
	if (!isMods) return !1
	let _return
	let _syntax = ''
	let _text = (/^=/.test(usedPrefix) ? 'return ' : '') + noPrefix
	let old = m.exp * 1
	try {
		let i = 15
		let f = {
			exports: {}
		}
		let exec = new (async () => { }).constructor('print', 'm', 'handler', 'require', 'axios', 'cheerio', 'conn', 'db', 'fs', 'store', 'connection', 'Array', 'process', 'args', 'groupMetadata', 'participants', 'module', 'exports', 'argument', _text)
		_return = await exec.call(conn, (...args) => {
			if (--i < 1) return
			console.log(...args)
			return conn.reply(m.chat, format(...args), m)
		}, m, handler, require, conn, axios, cheerio, db, fs, connection.store, connection, CustomArray, process, args, groupMetadata, participants, f, f.exports, [conn, _2])
	} catch (e) {
		let err = syntaxerror(_text, 'Execution Function', {
			allowReturnOutsideFunction: true,
			allowAwaitOutsideFunction: true,
				sourceType: 'module'
		})
		if (err) _syntax = '```' + err + '```\n\n'
		_return = e
	} finally {
		conn.reply(m.chat, _syntax + format(_return), m)
		m.exp = old
	}
}

handler.menuowner = ['> ', '=> ']
handler.tagsowner = ['mods']
handler.customPrefix = /^(=?> )/
handler.command = /(?:)/i

export default handler

class CustomArray extends Array {
	constructor(...args) {
		if (typeof args[0] == 'number') return super(Math.min(args[0], 10000))
		else return super(...args)
	}
}