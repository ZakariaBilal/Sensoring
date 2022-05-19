let mongoose = require("mongoose"),
  dao = new (require("./dao"))(),
  Subject = mongoose.model("Subject");

module.exports.findAll = () => {
  return dao.find();
};

module.exports.findById = id => {
  return dao.findById(id);
};

module.exports.create = async data => {
  let subject = await dao.findOne({ name: data.name });
  if (subject) {
    return subject;
  }

  subject = new Subject(data);
  return dao.save(subject);
};

module.exports.update = (id, data) => {
  return dao.update(id, data);
};

module.exports.delete = id => {
  return dao.delete(id);
};

