const Model = require('./model/modelName');

exports.get = async (req, res) => {
  try {
    const retrieved = await Model.getEntireCollection();
    res.status(200);
    res.send(retrieved);
  } catch(err){
    console.log('Error', err);
    res.status(500);
  }
}

exports.increment = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Model.UpdateIncrement(id);
    res.status(200);
    res.send(updated);
  } catch (err) {
    console.log('Error', err);
    res.status(500); 
  }
}

exports.decrement = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Model.UpdateDecrement(id);
    res.status(200);
    res.send(updated);
  } catch (err) {
    console.log('Error', err);
    res.status(500); 
  }
}

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Model.deleteDocument(id);
    res.status(204);
    res.send();
  } catch (err) {
    console.log('Error', err);
    res.status(500); 
  }
}


exports.post = async (req, res) => {
  try {
    const payload = req.body;
    const added = await Model.addDocument(payload);
    res.status(201);
    res.send(added);
  } catch (err) {
    console.log('Error', err);
    res.status(500); 
  }
}

