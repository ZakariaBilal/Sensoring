let mongoose = require("mongoose"),
  dao = new (require("./dao"))(),
  Activity = mongoose.model("Activity");

module.exports.findAll = () => {
  return dao.find({}, null, "type");
};

module.exports.findById = id => {
  return dao.findById(id);
};

module.exports.create = data => {
  let activity = new Activity(data);
  return dao.save(activity);
};

module.exports.update = (id, data) => {
  return dao.update(id, data);
};

module.exports.delete = id => {
  return dao.delete(id);
};

