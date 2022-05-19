let DAO = require('../../core/dao'),
    mongoose = require('mongoose'),
    Activity = mongoose.model('Activity');

class ActivityDao extends DAO {

    constructor() {
        super();
        this.model = Activity;
    }

}

module.exports = ActivityDao;