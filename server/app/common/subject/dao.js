let DAO = require('../../core/dao'),
    mongoose = require('mongoose'),
    Subject = mongoose.model('Subject');

class SubjectDao extends DAO {

    constructor() {
        super();
        this.model = Subject;
    }

}

module.exports = SubjectDao;