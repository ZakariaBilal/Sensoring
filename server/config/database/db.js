let _ = require('underscore'),
    env_config = require('../env').init();

let repl = null;
if (process.env.instance_database_replicaSet == "true") {
    repl = {
        name: process.env.instance_database_replicaSet_name,
        enabled: true,
        nodes: [{
            host: process.env.mongo_01_host,
            port: process.env.mongo_01_port
        }, {
            host: process.env.mongo_02_host,
            port: process.env.mongo_02_port
        }]
    }

}

let host = process.env.mongo_01_host || env_config.mongo.host,
    port = process.env.mongo_01_port || env_config.mongo.port,
    database = process.env.instance_database_name || env_config.mongo.database,
    login = process.env.instance_database_user || null,
    password = process.env.instance_database_pwd || null,
    replicaSet = repl || {
        name: "rs1",
        nodes: [{
            host: '127.0.0.1',
            port: 27017
        }],
        enabled: false
    };

let url = 'mongodb://' + host + ':' + port;
if (login && password) {
    url = 'mongodb://' + login + ':' + password + '@' + host + ':' + port;
}
if (replicaSet.enabled) {
    _.each(replicaSet.nodes, (node) => {
        url += ',' + node.host + ':' + node.port;
    })
    url += '/' + database + '?replicaSet=' + replicaSet.name
} else {
    url += '/' + database;
}

module.exports = {
    url: url,

}
