let mongoose = require("mongoose"),
  dao = new (require("./dao"))(),
  ExperimentData = mongoose.model("ExperimentData");

module.exports.findAll = () => {
  return dao.find();
};

module.exports.findById = id => {
  return dao.findById(id);
};

module.exports.create = data => {
  let experimentData = new ExperimentData(data);
  return dao.save(experimentData);
};

module.exports.update = (id, data) => {
  return dao.update(id, data);
};

module.exports.delete = id => {
  return dao.delete(id);
};

