let mongoose = require("mongoose"),
  dao = new (require("./dao"))(),
  Sensor = mongoose.model("Sensor");

module.exports.findAll = () => {
  return dao.find();
};

module.exports.findById = id => {
  return dao.findById(id);
};

module.exports.create = data => {
  let sensor = new Sensor(data);
  return dao.save(sensor);
};

module.exports.update = (id, data) => {
  return dao.update(id, data);
};

module.exports.delete = id => {
  return dao.delete(id);
};

