const mongoose = require('../db');

const Schema = mongoose.Schema;


/* Schema creates a blueprint for the new or current collection. 
  If no collection, MongoDB will create one after inserting the first document */
const topicSchema = new Schema({
  title: {type: String, default : ''},
  score: {type: Number, default: 0},
  published_at: {type: String, default: Date.now }
});

const Topic = mongoose.model('Topic', topicSchema);


module.exports = Topic;
