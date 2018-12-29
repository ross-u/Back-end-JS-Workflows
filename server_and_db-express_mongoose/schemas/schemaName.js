 const mongoose = require('../db');

const Schema = mongoose.Schema;


/* Schema creates a blueprint for the new or current collection.
  If no collection, MongoDB will create one after inserting the first document */
const nameOfTheSchema = new Schema(
  {
    // an example of json Schema with different data type use cases
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    score: { type: Number, default: 0 },
    created: { type: String, default: Date.now },
    public: Boolean
  }
);

/* create a model instance ( "a document mould" for a certain collection) on current mongoose connection. model isntance has methods for creating and reading documents from the underlying MongoDB database. */
const modelName = mongoose.model('modelName', nameOfTheSchema );
/* Mongoose automatically looks for the plural version of given name for the collection. 
Thus, the model `modelName` is for the `modelnames` collection in the database.
 */
module.exports = modelName;
