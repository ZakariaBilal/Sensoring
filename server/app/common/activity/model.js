let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

let schema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ActivityType' },
    timeRequired: { type: Number, required: true },
    data: [{ type: Object }]


});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Activity', schema);