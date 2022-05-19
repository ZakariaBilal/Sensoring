module.exports.extractTokenFromHeader = (req) => {
	const headers = req.headers;
	if (!headers || !headers.authorization) return false;
	let authArr = headers.authorization.split(' ');
	if (authArr.length != 2) return false;
	return authArr[1]; 
};

exports.extractTokenFromQuery = (req) => {
	const query = req.query;
	if(!query || !query.token) return false;
	return query.token;
};
