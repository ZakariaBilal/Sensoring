let DAO = require('../../core/dao'),
    mongoose = require('mongoose'),
    Config = mongoose.model('Config');

class ConfDAO extends DAO {

    constructor() {
        super();
        this.model = Config;
    }
    findOne() {
        return   this.model.findOne().lean().exec();
    }
}

module.exports = ConfDAO;