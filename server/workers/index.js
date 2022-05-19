module.exports = (modules) => {
    let mongoose = require('mongoose'),
        _ = require('underscore'),
        Database = require(__dirname + "/../config/database");

    Database.start(mongoose);

    let schemas = {};
    _.each(modules, (module) => {
        try {
            require(`${__dirname}/../app/${module}/model`);
        } catch (e) {
            if(e.code !== 'MODULE_NOT_FOUND') throw e; 
        }
    })
    return schemas;
}

