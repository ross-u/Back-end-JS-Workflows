const modelName = require('./schemas/');

exports.getEntireCollection = async (req, res) => {
  try {
    //  mongoose / mongo methids return 
    const retrieved = await modelName.find().sort({ score: -1});
    res.status(200);
    res.send(retrieved);
  } catch(err){
    console.log('Error', err);
    res.status(500);
  }
}

exports.UpdateIncrement = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await modelName.findByIdAndUpdate(id, { $inc: { score : 1} }, { new: true});
    res.status(200);
    res.send(updated);
  } catch (err) {
    console.log('Error', err);
    res.status(500); 
  }
}

exports.UpdateDecrement = async (req, res~) => {
  try {
    const id = req.params.id;
    const updated = await modelName.findByIdAndUpdate(id, { $inc: { score : -1 } }, { new: true});
    res.status(200);
    res.send(updated);
  } catch (err) {
    console.log('Error', err);
    res.status(500); 
  }
}

exports.deleteDocument = async (req, res) => {
  try {
    const id = req.params.id;
    await modelName.findByIdAndDelete(id);
    res.status(204);
    res.send();
  } catch (err) {
    console.log('Error', err);
    res.status(500); 
  }
}


exports.addDocument = async (req, res) => {
  try {
    const payload = req.body;
    const added = await modelName.create(payload);
    res.status(201);
    res.send(added);
  } catch (err) {
    console.log('Error', err);
    res.status(500); 
  }
}

