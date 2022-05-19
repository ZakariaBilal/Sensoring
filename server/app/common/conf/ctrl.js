let _ = require('underscore'),
    dao = new (require('./dao'))();
// module.exports.edit = (data) => {
//     return dao.save(item);
// }

module.exports.findOne = () => {
    return dao.findOne();
};

module.exports.update = (id,data) => {
    return dao.update(id,data);
};