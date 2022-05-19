let DAO = require('../../core/dao'),
    mongoose = require('mongoose'),
    Sensor = mongoose.model('Sensor');

class SensorDao extends DAO {

    constructor() {
        super();
        this.model = Sensor;
    }

}

module.exports = SensorDao;