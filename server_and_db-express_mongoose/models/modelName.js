const modelName = require('./../schemas/schemaName');

const getEntireCollection = (a) => {
  return modelName.find().sort({ score: -1 });
}

const UpdateIncrement = (id) => {
  return modelName.findByIdAndUpdate(id, { $inc: { score: 1 } }, { new: true });
}

const UpdateDecrement = (id) => {
  return modelName.findByIdAndUpdate(id, { $inc: { score: -1 } }, { new: true });
}

const deleteDocument = (id) => {
  return modelName.findByIdAndDelete(id);
}

const addDocument = (payload) => {
  return modelName.create(payload);
}

module.exports = {
  getEntireCollection,
  UpdateIncrement,
  UpdateDecrement,
  deleteDocument,
  addDocument
};s