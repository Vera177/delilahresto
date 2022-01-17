const jwt = require('jsonwebtoken');

const config = require('../config');

/**
 * 
 * @param {object} payload 
 * @returns {string}
 * @description retorna token
 */
function encode (payload) {
    const token = jwt.sign(payload, config.jwt_secret);
    return token;
}

/**
 * 
 * @param {string} token 
 * @returns {object}
 * @description Retorna token decodificado
 */
function decode(token){
    const data = jwt.verify(token, config.jwt_secret);
    return data;
}

module.exports = {
    encode,
    decode
}