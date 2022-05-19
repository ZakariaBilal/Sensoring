let _ = require('underscore'),
    Auth = require('../middlewares/auth');

module.exports = (app, routes, middleware) => {
    _.each(routes, (route) => {
        let args = []
        if (middleware) {
            args = [route.path, (req, res, next) => { Auth.checkAuth(req, res, next, routes) }, route.handler];
        } else {
            args = [route.path, route.handler];
        }
        app[route.method.toLowerCase()].apply(app, args);
    });
}