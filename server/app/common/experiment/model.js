let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

let schema = new mongoose.Schema({
    name: { type: String, required: true },
    sensors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sensor' }],
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],


});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Experiment', schema);