let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

let schema = new mongoose.Schema({
    name: {
        type: String, required: true
    },


});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('ActivityType', schema);