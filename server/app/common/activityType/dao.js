let DAO = require('../../core/dao'),
    mongoose = require('mongoose'),
    ActivityType = mongoose.model('ActivityType');

class ActivityTypeDao extends DAO {

    constructor() {
        super();
        this.model = ActivityType;
    }

}

module.exports = ActivityTypeDao;