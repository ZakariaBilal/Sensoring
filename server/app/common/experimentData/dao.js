let DAO = require('../../core/dao'),
    mongoose = require('mongoose'),
    ExperimentData = mongoose.model('ExperimentData');

class ExperimentDataDao extends DAO {

    constructor() {
        super();
        this.model = ExperimentData;
    }

}

module.exports = ExperimentDataDao;