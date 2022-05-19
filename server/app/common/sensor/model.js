let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

let schema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Accelerometer', 'Gyroscope', 'AbsoluteOrientationSensor'], required: true },
    frequency: { type: Number, default: 10 }


});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Sensor', schema);