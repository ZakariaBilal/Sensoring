let DAO = require('../../core/dao'),
    mongoose = require('mongoose'),
    Entity = mongoose.model('Entity');

class EntityDao extends DAO {

    constructor() {
        super();
        this.model = Entity;
    }

}

module.exports = EntityDao;