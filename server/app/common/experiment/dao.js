let DAO = require('../../core/dao'),
    mongoose = require('mongoose'),
    Experiment = mongoose.model('Experiment');

class ExperimentDao extends DAO {

    constructor() {
        super();
        this.model = Experiment;
    }

}

module.exports = ExperimentDao;