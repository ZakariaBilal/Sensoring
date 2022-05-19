let mongoose = require("mongoose"),
  dao = new (require("./dao"))(),
  ActivityType = mongoose.model("ActivityType");

module.exports.findAll = () => {
  return dao.find();
};

module.exports.findById = id => {
  return dao.findById(id);
};

module.exports.create = data => {
  let activityType = new ActivityType(data);
  return dao.save(activityType);
};

module.exports.update = (id, data) => {
  return dao.update(id, data);
};

module.exports.delete = id => {
  return dao.delete(id);
};

