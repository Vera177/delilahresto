const jwt = require('jsonwebtoken');

const config = require('../config');

function encode (payload) {
    const token = jwt.sign(payload, config.jwt_secret);
    return token;
}

function decode(token){
    const data = jwt.verify(token, config.jwt_secret);
    return data;
}

module.exports = {
    encode,
    decode
}