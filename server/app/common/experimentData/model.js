let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

let dataSchema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    data_1: { type: Object },
    data_2: { type: Object },
    data_3: { type: Object }
})

let schema = new mongoose.Schema({
    experimentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experiment' },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    data: [[[{ type: Object }]]],
    touchData: [
        {
            PageX: Number,
            PageY: Number,
            radiusX: Number,
            radiusY: Number,
            rotationAngle: Number,
            screenX: Number,
            screenY: Number,
            force: Number,
            timestamp: Number,
            type: String
        }]
});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('ExperimentData', schema);