let  jwt = require('jsonwebtoken');

module.exports.sign = (data) => {
	return jwt.sign(data, global.CONFIG.jwt.secretOrPublicKey, { expiresIn:data.expiresIn || global.CONFIG.jwt.expiresIn, algorithm: global.CONFIG.jwt.algorithm });
};

module.exports.verify = (token) => {
	return jwt.verify(token, global.CONFIG.jwt.secretOrPublicKey, { algorithm: global.CONFIG.jwt.algorithm });
};
