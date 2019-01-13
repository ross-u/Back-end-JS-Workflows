# Mongoose and Express - Basic Setup

<br>

<br>

## File Tree Overview

```js
📂server_and_db-express_mongoose
┣ 📂 models
┃ ┗ 📄modelName.js
┣ 📂schemas
┃ ┗ 📄schemaName.js
┣ 📄config.js
┣ 📄controller.js
┣ 📄db.js
┣ 📄express.index.js
┗ 📄router.js
```

<br>

<br>



## Install Dependencies

```bash
npm init
npm i express cors mongoose
npm i -save-dev nodemon eslint eslint-plugin-json
```

<br>

## Setup Express



**`index.js`** 

- import `express` module;
- import the `./config.js` and `./router.js` files
- instantiate the express server - `const app = express()` 
- Line up the <u>Middleware</u> methods - `express.static()` , `express.json()`, `router` .

```javascript
//  `index.js`
const express = require('express');
const cors = require('cors');
const router = require('./router');

const { PORT } = require('./config');
const app = express();

//  Middleware
app
.use(cors())
.use(express.json())
.use(router);

app.listen(PORT, () => {
  console.log(`Server is now listening to port ${PORT}.`)
});
```

<br>

**`router.js`** 

- instantiate the `express.Router()`.
- import the Node's `fs` module ,     `./config.js`    and     `./router.js`  files.
- 404 handling - if `404.html` file is available, save it's path and serve it as 404 when needed, if not save an error message string.

```javascript
// router.js

const express = require('express');
const fs = require('fs');
const controller = require('./controller');
const Router = express.Router;

const router = new Router();
let _404;

// Set the value of variable `_404`
fs.readFile('./404.html', (err, data) => {
  if (err) _404 = 'The requested URL was not found on this server.';
  else _404 = data;
});

// `request` and `response` are being implicitly passed to the controller methods
router.get('/endpoint', controller.get);
router.post('/endpoint', controller.post);
router.put('/endpoint/:paramName', controller.decrement);
router.delete('/endpoint/:idParam', controller.delete);

// Catchcall for "Not Found / 404"
router.get('/*', (req, res) => {
  res.status(404);
  res.send(_404);
    /* `res.send() and `res.json()` both allow us to "send" some data, and both as well "end" the response,
    so there is no need to explicitly call `res.end()` . */
});

module.exports = router;  
```

<br>



**`config.js`**  

```javascript
// config.js

const dbUrl = 'mongodb://localhost';
const dbName = 'db-name';
const URI = `${dbUrl}/${dbName}`;
const PORT = 3000;

module.exports = { dbUrl, dbName, URI, PORT };
```



____

___

____

<br>

<br>

## Connect  to the MongoDB

`db.js`

* Import the `mongoose` module 
* Create the connection to the database using Mongoose.
* Export the database connection, which will be used by the Model.



```javascript
// db.js

const mongoose = require('mongoose');
const { dbName } = require('./config');

// Create a connection to the database named `dbName`
mongoose.connect(`mongodb://localhost/${dbName}`, (err) => {
  if (err) return console.log(err);
  console.log(`Connected to the database.`)
});

// Export the database connection 
module.exports = mongoose;
```



<br>



## Create Schema & export the Model



`schemas/schemaName.js`

- Import the `db` module .
- Create the Schema for your collection using `mongoose.Schema` constructor.
- Instantiate the  Model ( `mongoose.model` ) by passing it the created schema.
- Export the Model, which will be used for querying the database.

```javascript
// 	./schemas/schemaName.js

const mongoose = require('../db');

// Schema constructor
const Schema = mongoose.Schema;

/* Schema creates a blueprint for the new or current Mongo Collection.
  If Collection doesn;t exist, MongoDB will create one with the given name after inserting the first document. */
const nameOfTheSchema = new Schema(
  {
    // an example of Schema with different data type use cases
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    score: { type: Number, default: 0 },
    created: { type: String, default: Date.now },
    public: Boolean
  }
);

/* Create a model instance ( "a document mould" for a certain collection) on current mongoose connection. */
const modelName = mongoose.model('modelName', nameOfTheSchema );
/* Every Model instance ( e.g. `modelName`) has methods for creating and reading documents from the underlying MongoDB database.
Note: Mongoose automatically looks for the plural version of given name for the collection. Thus, the model `modelName` is for the `modelnames` collection in the database. 	*/

// Export the Model to be used for querying the database.
module.exports = modelName;
```



<br>





## Create Query Methods

**`./models/modelName.js`**

* Import the `Model` instance from the previously created schema script.
* Create functions that return the result from querying the database through the model methods.
* More information on **Mongoose Model** - https://mongoosejs.com/docs/models.html

```javascript
//  ./models/modelName.js

// Import the Model instance
// Model instance has DB querying methods. 
const modelName = require('./../schemas/schemaName');

const getEntireCollection = (a) => {
  // return entire collection, sorted
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
};
```



<br>

<br>

## Configure the Controller



`./controller.js`

- We can import the model and it's `index.js` file that has a reference to all the Model `js` scripts  by requiring only the folder path  `./models/`,  **or** 

  - import the specific `./models/modelName` script .

- The `req` or `res` objects that are implicitly (by default) passed from the `router`,  are available in the `controller.js` methods.

- Use `async/await` for handling the asynchronous database queries done by the `Model` methods. 


  ```javascript
  const Model = require('./models/modelName');
  
  exports.get = async (req, res) => {
    try {
      // await the end of the asynchronous query to the DB
      const retrieved = await Model.getEntireCollection();
      res.status(200);
      res.send(retrieved);
    } catch(err){
      console.log('Error', err);
      res.status(500);
    }
  }
  
  exports.decrement = async (req, res) => {
    try {
      // Take the URL string parameter from `req.params`
      const documentName = req.params.paramName;
      const updated = await Model.UpdateDecrement(documentName);
      res.status(200);
      res.send(updated);
    } catch (err) {
      console.log('Error', err);
      res.status(500); 
    }
  }
  
  exports.delete = async (req, res) => {
    try {
      // Take the URL string parameter from `req.params`
      const id = req.params.id;
      // await the end of the asynchronous query to the DB
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
      // Take the POST request data from the `req.body` and store it
      const payload = req.body;
      const added = await Model.addDocument(payload);
      res.status(201);
      res.send(added);
    } catch (err) {
      console.log('Error', err);
      res.status(500); 
    }
  }
  
  ```


------

