const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')

const secret = config.jwt.secret

function sign(data){
	return jwt.sign(data, secret)
}

const check = {
	own: function (req, owner){
		const decoded = decodeHeader(req)

		if(decoded.id !== owner){
			throw error('No puedes hacer esto', 401)
		}

		
	}
}

function decodeHeader(req){
	const authorization = req.headers.authorization || ''
	const token = getToken(authorization)
	const decoder = verify(token)

	req.user = decoder

	return decoder
}

function getToken(authorization){
	if(!authorization){
		throw error('No viene ningun token', 401)	}

	if(authorization.indexOf('Bearer ') === -1){
		throw error('Formato invalido', 401)
	}

	let token = authorization.replace('Bearer ', '')
	return token
}

function verify(token){
	return jwt.verify(token, secret)
}

module.exports = {
	sign,
	check
}