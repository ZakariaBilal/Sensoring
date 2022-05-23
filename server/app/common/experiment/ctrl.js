let mongoose = require("mongoose"),
  dao = new (require("./dao"))(),
  Experiment = mongoose.model("Experiment");

module.exports.findAll = () => {
  return dao.find(null, null, [{ path: "sensors" }, { path: "activities", populate: "type" }]);
};

module.exports.findById = id => {
  return dao.findById(id);
};

module.exports.findByIdPopulate = id => {
  return dao.findById(id, true, null, ['sensors', { path: 'activities', populate: ["type"] }]);
};

module.exports.create = data => {
  let experiment = new Experiment(data);
  return dao.save(experiment);
};

module.exports.update = (id, data) => {
  return dao.update(id, data);
};

module.exports.delete = id => {
  return dao.delete(id);
};

