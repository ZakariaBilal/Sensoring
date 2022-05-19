let routes = require('./routes'),
    HttpBinder = require('../../../controllers/http-binder');

module.exports = (app) => HttpBinder(app, routes, true);