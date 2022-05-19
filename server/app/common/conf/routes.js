let to = require('await-to-js').default,
    Response = require('../../../helpers/response'),
    mongoose = require('mongoose'),
    ctrl = require('./ctrl');
   
module.exports = [
    {
        path: '/api/conf',
        method: 'PUT',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, config] = await to(ctrl.update(req.body._id,req.body));
            return Response.build(res, [err, config],[500,200]);
        }
    },
    {
        path: '/api/conf',
        method: 'GET',
        require: {
            token: true
        },
        handler: async (req, res) => {
            const [err, config] = await to(ctrl.findOne());
            return Response.build(res, [err, !config, config], [500, 404, 200]);
        }
    }
];