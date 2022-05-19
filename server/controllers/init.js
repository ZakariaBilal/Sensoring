let _ = require('underscore'),
    mongoose = require('mongoose'),
    ConfigSchema = new mongoose.Schema({
        config: {}
    });


module.exports = {
    config: () => {
        let Config = mongoose.model('Config', ConfigSchema),
            data = require('../config/settings');
        return new Promise((resolve, reject) => {
            Config.findOne((err, config) => {
                if (err) {
                    return reject(err);
                }
                if (!config) {
                    new Config({ config: data }).save((err) => {
                        if (!err) {
                            global.CONFIG = data;
                            resolve(null);
                        } else {
                            reject(err);
                        }
                    });
                } else {
                    var conf = config.toObject().config;
                    _.each(data, (value, key) => {

                        if (!conf.hasOwnProperty(key)) {
                            conf[key] = value;
                        }
                    })
                    config.config = conf;
                    config.save((err) => {
                        if (!err) {
                            global.CONFIG = config.config;
                            resolve(null);
                        } else {
                            reject(err);
                        }
                    });
                }
            })
        })
    }
}
