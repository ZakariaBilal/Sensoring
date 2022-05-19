let mongoose = require("mongoose"),
  dao = new (require("./dao"))(),
  Entity = mongoose.model("Entity");

module.exports.findAll = () => {
  return dao.find();
};

module.exports.findById = id => {
  return dao.findById(id);
};

module.exports.create = data => {
  let entity = new Entity(data);
  return dao.save(entity);
};

module.exports.update = (id, data) => {
  return dao.update(id, data);
};

module.exports.delete = id => {
  return dao.delete(id);
};

