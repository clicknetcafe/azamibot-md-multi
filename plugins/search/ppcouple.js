let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let anu = await (await fetch(`https://rest-api.akuari.my.id/randomimage/ppcouple`)).json()
		anu = anu.hasil
		await conn.sendMsg(m.chat, { image: { url: anu.cowok }, caption: `male` }, { quoted: m })
		await conn.sendMsg(m.chat, { image: { url: anu.cewek }, caption: `female` }, { quoted: m })
	} catch (e) {
		console.log(e)
		try {
		let anu = pepe.getRandom()
			await conn.sendMsg(m.chat, { image: { url: anu.male }, caption: `male` }, { quoted: m })
			await conn.sendMsg(m.chat, { image: { url: anu.female }, caption: `female` }, { quoted: m })
		} catch (e) {
			console.log(e)
			throw 'Internal server error.'
		}
	}
}

handler.help = ['ppcouple']
handler.tags = ['searching']
handler.command = /^((pp)?couple|ppcp)$/i

handler.premium = true
handler.limit = true

export default handler

const pepe = [
	{
		"male": "https://i.ibb.co/HGZqdzb/9b8278060e2d.jpg",
		"female": "https://i.ibb.co/V3kX3Cv/bf29432e6e21.jpg"
	}, {
		"male": "https://i.ibb.co/NFPKcPj/6d61f9c4cede.jpg",
		"female": "https://i.ibb.co/FwRqPDn/206818911fdd.jpg"
	}, {
		"male": "https://i.ibb.co/yQzxptw/7faabc24c6ff.jpg",
		"female": "https://i.ibb.co/2Yk4P2B/47fd82f61fd1.jpg"
	}, {
		"male": "https://i.ibb.co/cNhsYRV/7bff8e448134.jpg",
		"female": "https://i.ibb.co/j37Sc7X/a9600c228a8b.jpg"
	}, {
		"male": "https://i.ibb.co/DbMk8nL/957395cbf134.jpg",
		"female": "https://i.ibb.co/LQ4WJMR/f13a01cc7301.jpg"
	}, {
		"male": "https://i.ibb.co/ypvdYHW/7905e485ff20.jpg",
		"female": "https://i.ibb.co/4Z5rJrn/465bf6b56d86.jpg"
	}, {
		"male": "https://i.ibb.co/3pKd9jZ/527105aba87a.jpg",
		"female": "https://i.ibb.co/M9B742X/f608cecc4265.jpg"
	}, {
		"male": "https://i.ibb.co/Jn3tkg8/a1aab3d67644.jpg",
		"female": "https://i.ibb.co/CWx3NYc/8ad244372d8f.jpg"
	}, {
		"male": "https://i.ibb.co/CbdscQp/5918b5b3b674.jpg",
		"female": "https://i.ibb.co/ZWjNrZt/8257e3c9ffc0.jpg"
	}, {
		"male": "https://i.ibb.co/8069RmW/cfe9ed16a5b4.jpg",
		"female": "https://i.ibb.co/gPFp1DG/0e16334be10c.jpg"
	}, {
		"male": "https://i.ibb.co/P1SsfbG/a12d71cd6b9a.jpg",
		"female": "https://i.ibb.co/p4Xp2Xh/d7f6c5420b7a.jpg"
	}, {
		"male": "https://i.ibb.co/P17CTF9/924deeb25a3d.jpg",
		"female": "https://i.ibb.co/r55xYdy/8ee97786e6f8.jpg"
	}, {
		"male": "https://i.ibb.co/WykFqbW/57f78370f1e2.jpg",
		"female": "https://i.ibb.co/FWSCd2C/81e637d4a839.jpg"
	}, {
		"male": "https://i.ibb.co/rf6pKtp/53a463d8ebe9.jpg",
		"female": "https://i.ibb.co/Z2bDP7m/48990865816b.jpg"
	}, {
		"male": "https://i.ibb.co/RYB9JWG/4428e27ef288.jpg",
		"female": "https://i.ibb.co/LCnJfT7/5732f5315f2f.jpg"
	}, {
		"male": "https://i.ibb.co/3CLJfw3/151663d07c51.jpg",
		"female": "https://i.ibb.co/zXsJQ8R/96d088d2e0a0.jpg"
	}, {
		"male": "https://i.ibb.co/rxBN0S5/bd3b07b67ad6.jpg",
		"female": "https://i.ibb.co/6BYPMjC/4b36a8dfca20.jpg"
	}, {
		"male": "https://i.ibb.co/NW2dv07/58348a3d4008.jpg",
		"female": "https://i.ibb.co/sHkDdGd/87db7aaff335.jpg"
	}, {
		"male": "https://i.ibb.co/b3sMMnW/a13cdff40c6e.jpg",
		"female": "https://i.ibb.co/LgPn4vL/257ab65eb79d.jpg"
	}, {
		"male": "https://i.ibb.co/JzMhQ2P/45754b045a6d.jpg",
		"female": "https://i.ibb.co/nmftFnS/a1f2218f7c32.jpg"
	}, {
		"male": "https://i.ibb.co/R72GdTZ/30ebace5e0c1.jpg",
		"female": "https://i.ibb.co/7Rnb3Y0/d1459d6b3f59.jpg"
	}, {
		"male": "https://i.ibb.co/SmMvhb5/da465242e083.jpg",
		"female": "https://i.ibb.co/4gK0fVL/da35fc940b11.jpg"
	}, {
		"male": "https://i.ibb.co/Tbj6tzF/e93d133529d5.jpg",
		"female": "https://i.ibb.co/wwpFfqH/98bc4eb86562.jpg"
	}, {
		"male": "https://i.ibb.co/CJpdHyJ/348e5a66c088.jpg",
		"female": "https://i.ibb.co/9wd2mTM/fd4b6af0ccac.jpg"
	}, {
		"male": "https://i.ibb.co/Xkp1wx5/3a15abeb6394.jpg",
		"female": "https://i.ibb.co/8mzjZrt/3b2d60d15de4.jpg"
	}, {
		"male": "https://i.ibb.co/mSMmmGx/300e252914f3.jpg",
		"female": "https://i.ibb.co/LvTRt2w/c8f8d0b98c70.jpg"
	}, {
		"male": "https://i.ibb.co/LpctfNL/e1a158f621ba.jpg",
		"female": "https://i.ibb.co/YXpvh3j/2a91663a9f0a.jpg"
	}, {
		"male": "https://i.ibb.co/xgTsmW8/7ca77ee661d6.jpg",
		"female": "https://i.ibb.co/DMPWv4S/e3af8d2a6673.jpg"
	}, {
		"male": "https://i.pinimg.com/564x/d5/43/ae/d543aef3523502743b376db380cebff3.jpg",
		"female": "https://i.pinimg.com/564x/ed/83/9b/ed839b04efc10c9ef27050266be8dbd9.jpg"
	}, {
		"male": "https://i.pinimg.com/564x/32/ac/df/32acdff5d75f0de1239414a10d8178a6.jpg",
		"female": "https://i.pinimg.com/564x/c5/a9/4b/c5a94b1c9b5e4ba381e1223762066c83.jpg"
	}, {
		"male": "https://i.pinimg.com/564x/7c/35/ed/7c35ed596356ddc31ef3d926df97243b.jpg",
		"female": "https://i.pinimg.com/564x/f7/c1/21/f7c1219f9cd57d13b393442d6254b4e7.jpg"
	}, {
		"male": "https://i.pinimg.com/564x/bc/4a/9a/bc4a9aefafbad258df501b0b1233cc12.jpg",
		"female": "https://i.pinimg.com/564x/fd/53/41/fd5341a0aed334e24a538069294178bb.jpg"
	}, {
		"male": "https://i.pinimg.com/564x/fa/c2/e3/fac2e3209d59309dbe43c4f11fa3ce50.jpg",
		"female": "https://i.pinimg.com/564x/a9/7f/44/a97f4491e970ecf1fbdafbf3321e0ae9.jpg"
	}, {
		"male": "https://i.pinimg.com/564x/c2/8c/24/c28c2478c763c9c900c60b9fedd0717b.jpg",
		"female": "https://i.pinimg.com/564x/8f/4b/4a/8f4b4a9f2e428a359442500d3c0f9814.jpg"
	}, {
		"male": "https://i.pinimg.com/564x/09/3a/f2/093af2156b4b0d66799ac8d5eff6e7ff.jpg",
		"female": "https://i.pinimg.com/564x/27/7e/3a/277e3a698550c98581384db1f795ce5c.jpg"
	}, {
		"male": "https://i.pinimg.com/564x/d2/f4/eb/d2f4ebfb5007fe2b02d7012bee1ea198.jpg",
		"female": "https://i.pinimg.com/564x/3c/ed/a0/3ceda0e5a3208bc1c8db7ed41bd6c4ef.jpg"
	}, {
		"male": "https://i.pinimg.com/564x/90/71/a8/9071a8a949cc6d96e9a62fd9bc12720c.jpg",
		"female": "https://i.pinimg.com/564x/bd/76/3f/bd763f0a1b868cb55395adb6e4b8f8d2.jpg"
	}, {
		"male": "https://i.pinimg.com/564x/d7/48/8b/d7488b788d5cdd9c47228b77023408ec.jpg",
		"female": "https://i.pinimg.com/564x/0a/bc/0b/0abc0bbda1ddee1363f9e127ed0fc4b2.jpg"
	}, {
		"male": "https://i.pinimg.com/564x/a9/62/b7/a962b76b85315528c298a2049e3e229c.jpg",
		"female": "https://i.pinimg.com/564x/1a/f5/e4/1af5e46db62d937931ed19f3bf4d4c12.jpg"
	}, {
		"male": "https://i.pinimg.com/564x/15/14/67/1514672667b75047735d9582b6f98ac8.jpg",
		"female": "https://i.pinimg.com/564x/84/37/64/8437645b925627e48f2b20e9681af2d7.jpg"
	}, {
		"male": "https://i.pinimg.com/564x/e4/cd/ae/e4cdae6c3cd69e33b5286aa88b93bda6.jpg",
		"female": "https://i.pinimg.com/564x/75/1a/c6/751ac6fa3126adb4a89586e34ccdac03.jpg"
	}
]