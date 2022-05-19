let _ = require('underscore'),
    utils = require('../helpers/utils');

module.exports.checkAuth = async (req, res, next, routes) => {
    let route = _.findWhere(routes, { path: req.route.path, method: req.route.stack[0].method.toUpperCase() });

    utils.sanitize(req.body);

        return next();
    
}
